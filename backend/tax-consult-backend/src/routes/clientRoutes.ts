import express from 'express';
import sharedHandler from '../controllers/sharedHandler';
import config from '../config/clientConfig';

const router = express.Router();

router.get('/', sharedHandler.list(config));     
router.post('/', sharedHandler.create(config));
router.put('/:id', sharedHandler.update(config));
router.delete('/:id', sharedHandler.softDelete(config));
router.get('/deleted',sharedHandler.listDeleted(config));

export default router;
