"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharedHandler_1 = __importDefault(require("../controllers/sharedHandler"));
const caseConfig_1 = __importDefault(require("../config/caseConfig"));
const router = express_1.default.Router();
router.get('/', sharedHandler_1.default.list(caseConfig_1.default));
router.post('/', sharedHandler_1.default.create(caseConfig_1.default));
router.put('/:id', sharedHandler_1.default.update(caseConfig_1.default));
router.delete('/:id', sharedHandler_1.default.softDelete(caseConfig_1.default));
router.get('/deleted', sharedHandler_1.default.listDeleted(caseConfig_1.default));
exports.default = router;
