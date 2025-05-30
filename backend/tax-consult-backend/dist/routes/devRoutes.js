"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = __importDefault(require("../prisma/client"));
const router = express_1.default.Router();
router.delete('/nuke/all', async (req, res) => {
    try {
        // Delete all data
        await client_1.default.consults.deleteMany({});
        await client_1.default.cases.deleteMany({});
        await client_1.default.clients.deleteMany({});
        await client_1.default.users.deleteMany({});
        // Reset AUTO_INCREMENT counters
        await client_1.default.$executeRawUnsafe(`ALTER TABLE consults AUTO_INCREMENT = 1`);
        await client_1.default.$executeRawUnsafe(`ALTER TABLE cases AUTO_INCREMENT = 1`);
        await client_1.default.$executeRawUnsafe(`ALTER TABLE clients AUTO_INCREMENT = 1`);
        await client_1.default.$executeRawUnsafe(`ALTER TABLE users AUTO_INCREMENT = 1`);
        res.json({ nuked: true, reset: true });
    }
    catch (err) {
        console.error('❌ Nuke failed:', err);
        res.status(500).json({ error: 'Nuke failed', details: err });
    }
});
exports.default = router;
