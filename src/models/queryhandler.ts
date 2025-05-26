import { db } from '../db';
import { Request, Response } from 'express';

//GENERICs Query
async function getTable(req: Request, res: Response, config : {tableName : string}  , is_deleted: boolean) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const offset = (page - 1) * limit;
        const query = `
                SELECT * FROM ${config.tableName}
                WHERE is_deleted = ?
                ORDER BY updated_at DESC
                LIMIT ? OFFSET ?
                `;
        const [rows]: any = await db.query(query, [is_deleted, limit, offset]);
        res.json({ data: rows, page, limit });
        } catch (error) {
        console.error(`Fetch deleted from ${config.tableName} error:`, error);
        res.status(500).json({
            error: `Failed to fetch deleted records from ${config.tableName}`,
            details: error
        });
    }
}
async function postTable(req: Request, res: Response, config: {
    tableName: string,
    requiredFields: string[],
    optionalFields?: string[],
    uniqueFields: string[],
    softdeleteFields?: string,
    codeField?: string,
    codePrefix?: string
}) {
    try {
        const {tableName,requiredFields,optionalFields = [],uniqueFields,softdeleteFields,codeField,codePrefix} = config;
        const body = req.body;

        for (const field of requiredFields) {
        if (body[field] === undefined || body[field] === null || body[field] === '') {
            return res.status(400).json({ error: `Field '${field}' tidak boleh KOSONG` });
        }
        }

        const validationResult = await validateBeforeInsert({
        tableName,
        uniqueFields,
        softdeleteFields
        }, body);

        if (validationResult) {
        return res.status(validationResult.status).json({ error: validationResult.error });
        }

        // Generate code if configured
        if (codeField && codePrefix && !body[codeField]) {
        body[codeField] = await generateSequentialCode({
            tableName,
            codeField,
            prefix: codePrefix
        });
        }

        const allFields = requiredFields.concat(optionalFields);
        const filteredFields = allFields.filter(field => body.hasOwnProperty(field));
        if (codeField) filteredFields.push(codeField);

        const values = filteredFields.map(field => body[field] ?? null);
        const placeholders = filteredFields.map(() => '?').join(', ');
        const insertQuery = `
        INSERT INTO ${tableName}
        (${filteredFields.join(', ')})
        VALUES (${placeholders})
        `;

        await db.query(insertQuery, values);
        res.status(201).json({ message: 'Data berhasil dimasukkan' });
    
    } catch (err) {
        const error = err as any;
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({
            error: `Client tidak ditemukan atau sudah dihapus.`
        });
        }
        console.error('Insert error:', error);
        res.status(500).json({
        error: `Data GAGAL dimasukan di ${config.tableName}`,
        details: error
        });
    }
}

async function updateTableByID(req: Request, res: Response, config: {
    idfield: string,
    tableName: string,
    requiredFields: string[],
    optionalFields?: string[]
}) {
    try {
        const { id } = req.params;
        const body = req.body;
        const { idfield, tableName, requiredFields, optionalFields = [] } = config;

        const allFields = [...requiredFields, ...optionalFields];

        const fieldsToUpdate: string[] = [];
        const values: any[] = [];

        for (const field of allFields) {
            if (Object.prototype.hasOwnProperty.call(body, field)) {
                fieldsToUpdate.push(`${field} = ?`);
                values.push(body[field] === '' ? null : body[field]);
            }
        }

        if (fieldsToUpdate.length === 0) {
            return res.status(400).json({ error: `Tidak ada data untuk diupdate` });
        }

        values.push(id); // Add ID to the end

        const query = `UPDATE ${tableName} SET ${fieldsToUpdate.join(', ')} WHERE ${idfield} = ?`;

        const [result]: any = await db.query(query, values);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Record tidak ditemukan' });
        } else {
            res.json({ message: `${tableName} BERHASIL di UPDATE` });
        }
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: `${config.tableName} GAGAL di UPDATE`, details: error });
    }
}



async function softDeleteByID(req: Request, res: Response, config: {
    idfield: string,
    tableName: string,
    softdeleteFields: string}) {
    try {
        const { id } = req.params;
        const { idfield, tableName, softdeleteFields } = config;

        const query = `
            UPDATE ${tableName}
            SET ${softdeleteFields} = ?, deleted_at = NOW()
            WHERE ${idfield} = ?
        `;
        const values = [1, id];

        const [result]: any = await db.query(query, values);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: `${tableName} record tidak ditemukan` });
        } else {
            res.status(200).json({ message: `${tableName} record berhasil dihapus (soft delete)` });
        }

    } catch (error) {
        console.error('Soft delete error:', error);
        res.status(500).json({ error: `Gagal melakukan soft delete pada ${config.tableName}`, details: error });
    }
}


//{PROCESS}
async function validateBeforeInsert(config: {
    tableName: string,
    uniqueFields: string[],
    softdeleteFields?: string,  // ✅ match your config key
    foreignKey?: { field: string, refTable: string }
}, body: Record<string, any>): Promise<null | { error: string, status: number }> {

    const { tableName, uniqueFields, softdeleteFields, foreignKey } = config;

    // === 1. Unique field check (and soft-delete reactivation logic) ===
    if (uniqueFields.length > 0) {
        const whereClause = uniqueFields.map(field => `${field} = ?`).join(' AND ');
        const checkValues = uniqueFields.map(field => body[field]);

        const [rows]: any = await db.query(`SELECT * FROM ${tableName} WHERE ${whereClause}`, checkValues);

        if (rows.length > 0) {
            const existing = rows[0];

            if (softdeleteFields && existing[softdeleteFields]) {
                // Soft-deleted record exists — allow reactivation
                const updateClause = Object.keys(body).map(field => `${field} = ?`).join(', ');
                const updateValues = [...Object.values(body), ...checkValues];

                const updateQuery = `
                    UPDATE ${tableName}
                    SET ${updateClause}, ${softdeleteFields} = 0, deleted_at = NULL
                    WHERE ${whereClause}
                `;

                await db.query(updateQuery, updateValues);
                return { error: 'Soft-deleted record reactivated and updated.', status: 200 };
            } else {
                return { error: 'Data already exists.', status: 409 };
            }
        }
    }

    // === 2. Foreign key validation ===
    if (foreignKey) {
        const fkValue = body[foreignKey.field];
        const fkQuery = `
            SELECT 1 FROM ${foreignKey.refTable}
            WHERE ${foreignKey.field} = ? AND (${softdeleteFields ? `${softdeleteFields} = 0` : '1=1'})
        `;
        const [fkRows]: any = await db.query(fkQuery, [fkValue]);

        if (fkRows.length === 0) {
            return { error: `Foreign key '${foreignKey.field}' tidak valid atau telah dihapus.`, status: 400 };
        }
    }

    return null;
}
async function generateSequentialCode({
    tableName,
    codeField,
    prefix
    }: {
    tableName: string,
    codeField: string,
    prefix: string
    }): Promise<string> {
    const [rows] = await db.query(
        `SELECT ${codeField} FROM ${tableName} WHERE ${codeField} IS NOT NULL ORDER BY ${codeField} DESC LIMIT 1`
    );

    let nextNumber = 1;
    if ((rows as any[]).length > 0) {
        const lastCode = (rows as any[])[0][codeField];
        const match = lastCode.match(/(\d+)$/);
        if (match) {
        nextNumber = parseInt(match[1], 10) + 1;
        }
    }

    return `${prefix}-${nextNumber.toString().padStart(4, '0')}`;
}

//ADMIN ONlY
export async function checkStatus(req: Request, res: Response) {
    try {
        await db.query('SELECT 1'); 
        res.json({ status: 'ok', db: 'connected' });
    } catch (error) {
        console.error('DB error:', error);
        res.status(500).json({ status: 'error', db: 'not connected', details: error });
    }
}
export async function ClearAllTable (req: Request,res: Response,config: { tables: string[] }) {
    try {
        for (const table of config.tables) {
        // Delete all records
        await db.query(`DELETE FROM \`${table}\``);

        // Reset AUTO_INCREMENT
        await db.query(`ALTER TABLE \`${table}\` AUTO_INCREMENT = 1`);
        }

        res.status(200).json({
        message: 'All specified tables cleared and AUTO_INCREMENT reset successfully.',
        });
    } catch (error) {
        console.error('Failed to nuke database:', error);
        res.status(500).json({
        error: 'Failed to nuke database',
        details: error,
        });
    }
}


//EXPORTS
export default {
    getTable,
    postTable,

    updateTableByID,
    softDeleteByID,

    ClearAllTable
}