import { db } from './db';
import { Request, Response } from 'express';

export async function checkStatus(req: Request, res: Response) {
    try {
        await db.query('SELECT 1'); 
        res.json({ status: 'ok', db: 'connected' });
    } catch (error) {
        console.error('DB error:', error);
        res.status(500).json({ status: 'error', db: 'not connected', details: error });
    }
}

export async function PostData(req: Request, res: Response) {
    try {
        const { nama, kelas, npm } = req.body;

        if (!nama || !kelas || !npm) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const query = 'INSERT INTO test (nama, kelas, npm) VALUES (?, ?, ?)';
        const values = [nama, kelas, npm];

        await db.query(query, values);

        res.status(201).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error('Insert error:', error);
        res.status(500).json({ error: 'Database insert failed', details: error });
    }
}

export async function getAllData(req: Request, res: Response) {
    try {
        const [rows] = await db.query('SELECT * FROM test');
        res.json(rows);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch data', details: error });
    }
}

export async function updateData(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { nama, kelas, npm } = req.body;

        if (!nama || !kelas || !npm) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const query = 'UPDATE test SET nama = ?, kelas = ?, npm = ? WHERE id = ?';
        const values = [nama, kelas, npm, id];

        const [result]: any = await db.query(query, values);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'entity not found' });
        } else {
            res.json({ message: 'entity updated successfully' });
        }
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Failed to update entity', details: error });
    }
}

export async function deleteData(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM test WHERE id = ?';
        
        const [result]: any = await db.query(query, [id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Student not found' });
        } else {
            res.json({ message: 'entity deleted successfully' });
        }
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Failed to delete entity', details: error });
    }
}

export async function getDataById(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const query = 'SELECT * FROM test WHERE id = ?';
        const [rows]: any = await db.query(query, [id]);

        if (rows.length === 0) {
            res.status(404).json({ message: 'entity not found' });
        } else {
            res.json(rows[0]); // Return the single student object
        }
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch data', details: error });
    }
}

export async function deleteAll(req: Request, res: Response) {
    try {
        // Delete all rows
        const deleteQuery = 'DELETE FROM test';
        const [result]: any = await db.query(deleteQuery);

        // Reset AUTO_INCREMENT to 1
        await db.query('ALTER TABLE test AUTO_INCREMENT = 1');

        res.json({ message: 'All data deleted and auto-increment reset', affectedRows: result.affectedRows });
    } catch (error) {
        console.error('Delete all error:', error);
        res.status(500).json({ error: 'Failed to delete all data', details: error });
    }
}
