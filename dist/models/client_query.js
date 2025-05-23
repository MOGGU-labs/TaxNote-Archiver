"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
//CLIENTS QUERIES
async function checkStatus(req, res) {
    try {
        await db_1.db.query('SELECT 1');
        res.json({ status: 'ok', db: 'connected' });
    }
    catch (error) {
        console.error('DB error:', error);
        res.status(500).json({ status: 'error', db: 'not connected', details: error });
    }
}
async function getClients(req, res) {
    try {
        const [rows] = await db_1.db.query('SELECT * FROM clients');
        res.json(rows);
    }
    catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch data from clients', details: error });
    }
}
async function postClients(req, res) {
    try {
        const { nama_client, badan_usaha, telp, alamat, npwp, nkp, keterangan } = req.body;
        if (!nama_client || !badan_usaha || !telp || !alamat || !npwp || !nkp) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        const query = 'INSERT INTO test (nama_client,badan_usaha,telp,alamat,npwp,nkp,keterangan) VALUES (?, ?, ? ,? ,? ,? ,?)';
        const values = [nama_client, badan_usaha, telp, alamat, npwp, nkp, keterangan];
        await db_1.db.query(query, values);
        res.status(201).json({ message: 'Data inserted successfully' });
    }
    catch (error) {
        console.error('Insert error:', error);
        res.status(500).json({ error: 'Database insert failed', details: error });
    }
}
exports.default = {
    checkStatus,
    getClients,
    postClients
};
