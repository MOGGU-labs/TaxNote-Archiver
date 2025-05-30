"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharedHandler_1 = __importDefault(require("../controllers/sharedHandler"));
const clientConfig_1 = __importDefault(require("../config/clientConfig"));
const router = express_1.default.Router();
router.get('/', sharedHandler_1.default.list(clientConfig_1.default));
router.post('/', sharedHandler_1.default.create(clientConfig_1.default));
router.put('/:id', sharedHandler_1.default.update(clientConfig_1.default));
router.delete('/:id', sharedHandler_1.default.softDelete(clientConfig_1.default));
router.get('/deleted', sharedHandler_1.default.listDeleted(clientConfig_1.default));
exports.default = router;
