
//Merger is a Test Fields for Making Functions

import { db } from '../db';
import { Request, Response } from 'express';
import { clientConfigs,caseConfigs,consultConfigs} from '../Example/Config';


async function getTable(req: Request, res: Response, table: string, is_deleted: boolean) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const offset = (page - 1) * limit;
        const query = `
                SELECT * FROM ${table}
                WHERE is_deleted = ?
                ORDER BY updated_at DESC
                LIMIT ? OFFSET ?
                `;
        const [rows]: any = await db.query(query, [is_deleted, limit, offset]);
        res.json({ data: rows, page, limit });
        } catch (error) {
        console.error(`Fetch deleted from ${table} error:`, error);
        res.status(500).json({
            error: `Failed to fetch deleted records from ${table}`,
            details: error
        });
    }
}

async function postTable(req: Request, res: Response, config: {
    tableName: string,
    requiredFields: string[],
    optionalFields?: string[],
    uniqueFields: string[],
    softDeleteField?: string}
    ) {
    try {
        //=============================== :1 ===============================
        //Define config and body
        const { tableName, requiredFields, optionalFields = [], uniqueFields, softDeleteField} = config;
        const body = req.body;

        //Filter requiredFields that can NOT be null/empty
        for (const field of requiredFields) {
            if (!body[field]) {
                return res.status(400).json({ error: `Field '${field}' tidak boleh KOSONG` });
            }
        }
        //=============================== :2 ===============================
        //Build allfields by merging require and optional fields
        const allFields = requiredFields.concat(optionalFields);
        const values = allFields.map(field => body[field] ?? null);

        //=============================== :3 ===============================
        //Build WHERE clause to check for existing record
        const whereClause = uniqueFields.map(field => `${field} = ?`).join(' AND ');
        const checkValues = uniqueFields.map(field => body[field]);

        const checkQuery = `SELECT * FROM ${tableName} WHERE ${whereClause}`;
        const [rows]: any = await db.query(checkQuery, checkValues);
        
        //=============================== :4 ===============================
        //Validate 
        if (rows.length > 0) {
                    const existing = rows[0];
                    // Check if the record is soft-deleted
                    if (softDeleteField && existing[softDeleteField]) {
                        // Reactivate the soft-deleted record
                        const updateClause = allFields.map(field => `${field} = ?`).join(', ');
                        const updateValues = [...values, ...checkValues];
                        const updateQuery = `
                            UPDATE ${tableName}
                            SET ${updateClause}, ${softDeleteField} = false
                            WHERE ${whereClause}
                        `;
                        await db.query(updateQuery, updateValues);
                        return res.status(200).json({ message: 'Record yang dihapus berhasil diaktifkan kembali' });
                        }
                    }   
            if (rows.length > 0) {
                return res.status(409).json({ message: 'Data already exists.' });
            }
        //=============================== :4 ===============================
        // No record found at all — safe to insert new one
        const placeholders = allFields.map(() => '?').join(', ');
        const insertQuery = `
            INSERT INTO ${tableName} 
            (${allFields.join(', ')}) 
            VALUES (${placeholders})  
            `;
            //Basically That was | >`INSERT INTO clients +(fields, ...) + Values [?, ...]`|
        await db.query(insertQuery, values); 
    } catch (error) {
        console.error('Insert error:', error);
        res.status(500).json({ error: `Data GAGAL dimasukan di ${config.tableName}}`, details: error });
    }
}

async function updateTablebyID(req: Request, res: Response, config: {
    idfield: string,
    tableName: string,
    requiredFields: string[],
    optionalFields?: string[]}) {
    
        try {
        const { id } = req.params;
        const body = req.body;

        const {idfield , tableName, requiredFields, optionalFields = [] } = config;
        
        for (const field of requiredFields) {
            if (!body[field]) {
                return res.status(400).json({ error: `Field '${tableName}' tidak boleh KOSONG` });
            }
        }

        const allFields = requiredFields.concat(optionalFields);

        const setClause = allFields.map(field => `${field} = ?`).join(', ');
        const values = allFields.map(field => body[field] ?? null);
        values.push(id);

        const query = `UPDATE ${tableName} SET ${setClause} WHERE ${idfield} = ?`;

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
import { adminConfig } from '../Example/adminConfig';

export async function nukeDatabase(req: Request, res: Response) {
    try {
        for (const table of adminConfig.tables) {
        await db.query(`DELETE FROM ${table}`);
        }

        res.status(200).json({ message: 'All specified tables cleared successfully.' });
    } catch (error) {
        console.error('Failed to nuke database:', error);
        res.status(500).json({
        error: 'Failed to nuke database',
        details: error
        });
    }
}