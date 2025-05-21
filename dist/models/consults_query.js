"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
//CONSULTS QUERIES
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
exports.default = {
    checkStatus,
};
