import express from 'express';

import { db } from './db'; // import database >:)
import { NUKEINCOMINNNNN } from './adminpriv'; // fucking nuclear button

import { ResultSetHeader } from 'mysql2';
import { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Very handsome niggas (niche good guides & assets) for functions
async function createFolder(req: Request, res: Response) {
  // Destructure input from request body
  const { name, phone, address, npwp, pkp, folderTitle, author } = req.body;

  try {
    // Insert info dari  client
    const [clientResult] = await db.query(
      'INSERT INTO clients (name, phone, address, npwp, pkp) VALUES (?, ?, ?, ?, ?)',
      [name, phone, address, npwp, pkp]
    );
    const clientId = (clientResult as ResultSetHeader).insertId;

    // Insert info folder terkait client
    const [folderResult] = await db.query(
      'INSERT INTO folders (client_id, folder_title, author) VALUES (?, ?, ?)',
      [clientId, folderTitle, author]
    );
    const folderId = (folderResult as ResultSetHeader).insertId;

    // Send response
    res.json({ success: true, clientId, folderId });
  } catch (error) {
    console.error('DB error:', error);
    res.status(500).json({ error: 'Database error', details: error });
  }
}
async function checkStatus(req: Request, res: Response) {
  try {
    await db.query('SELECT 1'); // Simple ping to DB
    res.json({ status: 'ok', db: 'connected' });
  } catch (error) {
    console.error('DB error:', error);
    res.status(500).json({ status: 'error', db: 'not connected', details: error });
  }
}
async function fetchClients(req: Request, res: Response) {
  
}
async function fetchFolder(req: Request, res: Response) {
  
}

//Route Methods
//get server staus
app.get('/api/status',checkStatus);
//send input from forms?(idk what i was typin here lol) in the frontend to Database
app.post('/api/create-folder', createFolder);
//get deez data from the TABLE "Clients"
app.get('/api/clients', fetchClients);
//get deez data from the TABLE "Folders; 
app.get('/api/Cases', fetchFolder);
//nuke the database, VERY DANGEROUS OooooOOOOoo~
app.delete('/api/909/warhead/nuke',NUKEINCOMINNNNN);


//check farts from the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});