import { Request, Response } from 'express';
import { db } from './db'; // import database >:)

export async function NUKEINCOMINNNNN(req: Request, res: Response) {
    try {
    // Disable foreign key checks temporarily
    await db.query('SET FOREIGN_KEY_CHECKS = 0');

    // List of all tables you want to nuke
    const tables = ['konsultasi', 'folders', 'clients']; 

    for (const table of tables) {
      await db.query(`TRUNCATE TABLE \`${table}\``); // deletes all data + resets AUTO_INCREMENT
    }

    // Re-enable foreign key checks
    await db.query('SET FOREIGN_KEY_CHECKS = 1');

    res.status(200).json({ message: '💥 All data nuked. RIP database.' });
    console.log('☢️ NUKE route triggered');

    } catch (error) {
    console.error(' NUKE ERROR:', error);
    res.status(500).json({ message: 'Nuke failed. Target remains.', error });
    }
}