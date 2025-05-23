import { db } from '../db';
import { Request, Response } from 'express';

//CLIENTS QUERIES
async function getClients(req: Request,res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const offset = (page - 1) * limit;
        const query = (`
            SELECT * FROM clients 
            WHERE is_deleted = 0 
            ORDER BY updated_at DESC
            LIMIT ? OFFSET ?`
            );
        const [rows]: any = await db.query(query, [limit, offset]);

        res.json({ data: rows, page, limit });
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch data from clients', details: error });
    }
}
async function postClients(req: Request, res: Response) {
    try {
        const {nama_client,badan_usaha,telp,alamat,npwp,nkp,keterangan} = req.body;

        if (!nama_client || !badan_usaha || !telp || !alamat || !npwp || !nkp ) {
            res.status(400).json({ error: 'FIELD tidak boleh KOSONG' });
            return;
        }

        const query = 'INSERT INTO clients (nama_client,badan_usaha,telp,alamat,npwp,nkp,keterangan) VALUES (?, ?, ? ,? ,? ,? ,?)';
        const values = [nama_client,badan_usaha,telp,alamat,npwp,nkp,keterangan];

        await db.query(query, values);

        res.status(201).json({ message: 'Data BERHASIL dimasukan' });
    } catch (error) {
        console.error('Insert error:', error);
        res.status(500).json({ error: 'Data GAGAL dimasukan', details: error });
    }
}
async function updateClientbyid(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { nama_client, badan_usaha, telp, alamat, npwp, nkp } = req.body;

        if (!nama_client || !badan_usaha || !telp || !alamat || !npwp || !nkp) {
            res.status(400).json({ error: 'FIELD tidak boleh KOSONG' });
            return;
        }

        const query = 'UPDATE clients SET nama_client = ?, badan_usaha = ?, telp = ?, alamat = ?, npwp = ?, nkp = ? WHERE id_client = ?';
        const values = [nama_client, badan_usaha, telp, alamat, npwp, nkp, id];

        const [result]: any = await db.query(query, values);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Record tidak ada' });
        } else {
            res.json({ message: 'Client BERHASIL di UPDATE' });
        }
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Client GAGAL di UPDATE ', details: error });
    }
}
async function deleteClientbyid(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const query = 'UPDATE clients SET is_deleted = ?, deleted_at = NOW() WHERE id_client = ?';
        const values = [1, id]; // 1 = soft delete

        const [result]: any = await db.query(query, values);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Client tidak ditemukan' });
        } else {
            res.status(200).json({ message: 'Client berhasil dihapus (soft delete)' });
        }
    } catch (error) {
        console.error('Soft delete error:', error);
        res.status(500).json({ error: 'Gagal melakukan soft delete', details: error });
    }
}

export default {
    getClients,
    postClients,
    updateClientbyid,
    deleteClientbyid
}

//Columns
/*
nama_client,
badan_usaha,
telp,alamat,
npwp,
nkp,
keterangan,
created_at,
updated_at,
is_deleted,
deleted_at
*/