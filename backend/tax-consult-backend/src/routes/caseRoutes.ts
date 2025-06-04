import express from 'express';
import sharedHandler from '../controllers/sharedHandler';
import config from '../config/caseConfig';
import { authenticateJWT } from '../middleware/authMiddleware'; // ✅ Import auth middleware

const router = express.Router();

router.use(authenticateJWT);

router.get('/', sharedHandler.list(config));     
router.post('/', sharedHandler.create(config));
router.put('/:id', sharedHandler.update(config));
router.delete('/:id', sharedHandler.softDelete(config));
router.get('/deleted',sharedHandler.listDeleted(config));

export default router;
