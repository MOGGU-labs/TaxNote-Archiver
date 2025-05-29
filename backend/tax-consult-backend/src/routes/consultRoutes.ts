import express from 'express';
import sharedHandler from '../controllers/sharedHandler';
import config from '../config/consultConfig';

const router = express.Router();

router.get('/', sharedHandler.list(config));     
router.post('/', sharedHandler.create(config));
router.put('/:id', sharedHandler.update(config));
router.delete('/:id', sharedHandler.softDelete(config));
router.get('/deleted',sharedHandler.listDeleted(config));

import prisma from '../prisma/client';
router.delete('/dev/nuke', async (req, res) => {
    try {
        await prisma.consults.deleteMany({});
        res.json({ nuked: true });
    } catch (err) {
        console.error('Nuke failed:', err);
        res.status(500).json({ error: 'Nuke failed', details: err });
    }
});
export default router;
