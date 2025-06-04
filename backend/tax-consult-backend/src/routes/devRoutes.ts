import express from 'express';
import prisma from '../prisma/client';

const router = express.Router();

router.delete('/nuke/all', async (req, res) => {
    try {
        // Delete all data
        await prisma.consults.deleteMany({});
        await prisma.cases.deleteMany({});
        await prisma.clients.deleteMany({});


        // Reset AUTO_INCREMENT counters
        await prisma.$executeRawUnsafe(`ALTER TABLE consults AUTO_INCREMENT = 1`);
        await prisma.$executeRawUnsafe(`ALTER TABLE cases AUTO_INCREMENT = 1`);
        await prisma.$executeRawUnsafe(`ALTER TABLE clients AUTO_INCREMENT = 1`);


        res.json({ nuked: true, reset: true });
    } catch (err) {
        console.error('❌ Nuke failed:', err);
        res.status(500).json({ error: 'Nuke failed', details: err });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await prisma.users.findMany({
        select: {
            id_user: true,
            username: true,
            full_name: true,
            email: true,
            created_at: true
        }
        });

        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

export default router;
