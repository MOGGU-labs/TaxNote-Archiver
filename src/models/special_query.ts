import { db } from '../db';
import { Request, Response } from 'express';
//GENERICs

async function checkStatus(req: Request, res: Response) {
    try {
        await db.query('SELECT 1'); 
        res.json({ status: 'ok', db: 'connected' });
    } catch (error) {
        console.error('DB error:', error);
        res.status(500).json({ status: 'error', db: 'not connected', details: error });
    }
}

async function getTable(req: Request, res: Response, table: string, is_deleted: number) {
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


async function getDeletedClients(req: Request, res: Response) {
    await getTable(req, res, 'clients',1);
}

async function getDeletedCases(req: Request, res: Response) {
    await getTable(req, res, 'cases',1);
}

async function getConsults(req: Request, res: Response) {
    await getTable(req, res, 'cases',0);
}

export default {
    checkStatus,
    getDeletedClients,
    getDeletedCases,
    getConsults
}