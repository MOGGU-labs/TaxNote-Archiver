"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStatus = checkStatus;
exports.PostData = PostData;
exports.getAllData = getAllData;
exports.updateData = updateData;
exports.deleteData = deleteData;
exports.getDataById = getDataById;
exports.deleteAll = deleteAll;
const db_1 = require("../db");
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
async function PostData(req, res) {
    try {
        const { nama, kelas, npm } = req.body;
        if (!nama || !kelas || !npm) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        const query = 'INSERT INTO test (nama, kelas, npm) VALUES (?, ?, ?)';
        const values = [nama, kelas, npm];
        await db_1.db.query(query, values);
        res.status(201).json({ message: 'Data inserted successfully' });
    }
    catch (error) {
        console.error('Insert error:', error);
        res.status(500).json({ error: 'Database insert failed', details: error });
    }
}
async function getAllData(req, res) {
    try {
        const [rows] = await db_1.db.query('SELECT * FROM test');
        res.json(rows);
    }
    catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch data', details: error });
    }
}
async function updateData(req, res) {
    try {
        const { id } = req.params;
        const { nama, kelas, npm } = req.body;
        if (!nama || !kelas || !npm) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        const query = 'UPDATE test SET nama = ?, kelas = ?, npm = ? WHERE id = ?';
        const values = [nama, kelas, npm, id];
        const [result] = await db_1.db.query(query, values);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'entity not found' });
        }
        else {
            res.json({ message: 'entity updated successfully' });
        }
    }
    catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Failed to update entity', details: error });
    }
}
async function deleteData(req, res) {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM test WHERE id = ?';
        const [result] = await db_1.db.query(query, [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Student not found' });
        }
        else {
            res.json({ message: 'entity deleted successfully' });
        }
    }
    catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Failed to delete entity', details: error });
    }
}
async function getDataById(req, res) {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM test WHERE id = ?';
        const [rows] = await db_1.db.query(query, [id]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'entity not found' });
        }
        else {
            res.json(rows[0]); // Return the single student object
        }
    }
    catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch data', details: error });
    }
}
async function deleteAll(req, res) {
    try {
        // Delete all rows
        const deleteQuery = 'DELETE FROM test';
        const [result] = await db_1.db.query(deleteQuery);
        // Reset AUTO_INCREMENT to 1
        await db_1.db.query('ALTER TABLE test AUTO_INCREMENT = 1');
        res.json({ message: 'All data deleted and auto-increment reset', affectedRows: result.affectedRows });
    }
    catch (error) {
        console.error('Delete all error:', error);
        res.status(500).json({ error: 'Failed to delete all data', details: error });
    }
}
