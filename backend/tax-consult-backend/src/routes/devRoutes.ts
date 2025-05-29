import express from 'express';
import prisma from '../prisma/client';

const router = express.Router();

router.delete('/nuke/all', async (req, res) => {
    try {
        // Delete all data
        await prisma.consults.deleteMany({});
        await prisma.cases.deleteMany({});
        await prisma.clients.deleteMany({});
        await prisma.users.deleteMany({});

        // Reset AUTO_INCREMENT counters
        await prisma.$executeRawUnsafe(`ALTER TABLE consults AUTO_INCREMENT = 1`);
        await prisma.$executeRawUnsafe(`ALTER TABLE cases AUTO_INCREMENT = 1`);
        await prisma.$executeRawUnsafe(`ALTER TABLE clients AUTO_INCREMENT = 1`);
        await prisma.$executeRawUnsafe(`ALTER TABLE users AUTO_INCREMENT = 1`);

        res.json({ nuked: true, reset: true });
    } catch (err) {
        console.error('❌ Nuke failed:', err);
        res.status(500).json({ error: 'Nuke failed', details: err });
    }
});

export default router;
