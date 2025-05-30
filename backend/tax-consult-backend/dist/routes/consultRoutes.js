"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharedHandler_1 = __importDefault(require("../controllers/sharedHandler"));
const consultConfig_1 = __importDefault(require("../config/consultConfig"));
const router = express_1.default.Router();
router.get('/', sharedHandler_1.default.list(consultConfig_1.default));
router.post('/', sharedHandler_1.default.create(consultConfig_1.default));
router.put('/:id', sharedHandler_1.default.update(consultConfig_1.default));
router.delete('/:id', sharedHandler_1.default.softDelete(consultConfig_1.default));
router.get('/deleted', sharedHandler_1.default.listDeleted(consultConfig_1.default));
const client_1 = __importDefault(require("../prisma/client"));
router.delete('/dev/nuke', async (req, res) => {
    try {
        await client_1.default.consults.deleteMany({});
        res.json({ nuked: true });
    }
    catch (err) {
        console.error('Nuke failed:', err);
        res.status(500).json({ error: 'Nuke failed', details: err });
    }
});
exports.default = router;
