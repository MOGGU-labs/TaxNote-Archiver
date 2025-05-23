import { db } from '../db';
import { Request, Response } from 'express';
//CASES QUERIES
async function getCases(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const offset = (page - 1) * limit;
        const query = (`
            SELECT * FROM cases
            WHERE is_deleted = 0 
            ORDER BY updated_at DESC
            LIMIT ? OFFSET ?`
            );
        const [rows]: any = await db.query(query, [limit, offset]);

        res.json({ data: rows, page, limit });
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch data from cases', details: error });
    }
}
async function postCases(req: Request, res: Response) {
    try {
        const { case_name,
                case_type,
                case_description
            } = req.body;

        if (!case_name ||!case_type || !case_description ) {
            res.status(400).json({ error: 'FIELD tidak boleh KOSONG' });
            return;
        }

        const query = `INSERT INTO cases (case_name,case_type,case_description) VALUES (?, ?, ?)`;
        const values = [case_name,case_type,case_description];

        await db.query(query, values);

        res.status(201).json({ message: 'Data BERHASIL dimasukan' });
    } catch (error) {
        console.error('Insert error:', error);
        res.status(500).json({ error: 'Data GAGAL dimasukan', details: error });
    }
}
async function updateCasesbyid(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { case_name,case_type,case_description} = req.body;

        if (!case_name || !case_type || !case_description) {
            res.status(400).json({ error: 'FIELD tidak boleh KOSONG' });
            return;
        }

        const query = 'UPDATE cases SET case_name = ? ,case_type= ? ,case_description = ?  WHERE id_cases = ?';
        const values = [case_name,case_type,case_description, id];

        const [result]: any = await db.query(query, values);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Record tidak ada' });
        } else {
            res.json({ message: 'Case BERHASIL di UPDATE' });
        }
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Case GAGAL di UPDATE ', details: error });
    }
}
async function deleteCasesbyid(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const query = 'UPDATE cases SET is_deleted = ?, deleted_at = NOW() WHERE id_cases = ?';
        const values = [1, id]; // 1 = soft delete

        const [result]: any = await db.query(query, values);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Case tidak ditemukan' });
        } else {
            res.status(200).json({ message: 'Case berhasil dihapus (soft delete)' });
        }
    } catch (error) {
        console.error('Soft delete error:', error);
        res.status(500).json({ error: 'Gagal melakukan soft delete', details: error });
    }
}

export default {
    getCases,
    postCases,
    updateCasesbyid,
    deleteCasesbyid
}
//COLUMNS
/*
id_cases,
id_client,
case_name,        
case_type,
case_description,
created_at,
updated_at,
is_deleted,
deleted_at
*/