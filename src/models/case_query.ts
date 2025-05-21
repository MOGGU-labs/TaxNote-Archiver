import { db } from '../db';
import { Request, Response } from 'express';
//CASES QUERIES
async function checkStatus(req: Request, res: Response) {
    try {
        await db.query('SELECT 1'); 
        res.json({ status: 'ok', db: 'connected' });
    } catch (error) {
        console.error('DB error:', error);
        res.status(500).json({ status: 'error', db: 'not connected', details: error });
    }
}



export default {
    checkStatus,
}