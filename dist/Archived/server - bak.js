"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db"); // import database >:)
const adminpriv_1 = require("./adminpriv"); // fucking nuclear button
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Very handsome niggas (niche good guides & assets) for functions
async function createFolder(req, res) {
    // Destructure input from request body
    const { name, phone, address, npwp, pkp, folderTitle, author } = req.body;
    try {
        // Insert info dari  client
        const [clientResult] = await db_1.db.query('INSERT INTO clients (name, phone, address, npwp, pkp) VALUES (?, ?, ?, ?, ?)', [name, phone, address, npwp, pkp]);
        const clientId = clientResult.insertId;
        // Insert info folder terkait client
        const [folderResult] = await db_1.db.query('INSERT INTO folders (client_id, folder_title, author) VALUES (?, ?, ?)', [clientId, folderTitle, author]);
        const folderId = folderResult.insertId;
        // Send response
        res.json({ success: true, clientId, folderId });
    }
    catch (error) {
        console.error('DB error:', error);
        res.status(500).json({ error: 'Database error', details: error });
    }
}
async function checkStatus(req, res) {
    try {
        await db_1.db.query('SELECT 1'); // Simple ping to DB
        res.json({ status: 'ok', db: 'connected' });
    }
    catch (error) {
        console.error('DB error:', error);
        res.status(500).json({ status: 'error', db: 'not connected', details: error });
    }
}
async function fetchClients(req, res) {
}
async function fetchFolder(req, res) {
}
//Route Methods
//get server staus
app.get('/api/status', checkStatus);
//send input from forms?(idk what i was typin here lol) in the frontend to Database
app.post('/api/create-folder', createFolder);
//get deez data from the TABLE "Clients"
app.get('/api/clients', fetchClients);
//get deez data from the TABLE "Folders; 
app.get('/api/Cases', fetchFolder);
//nuke the database, VERY DANGEROUS OooooOOOOoo~
app.delete('/api/909/warhead/nuke', adminpriv_1.NUKEINCOMINNNNN);
//check farts from the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
