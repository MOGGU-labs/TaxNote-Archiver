"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NUKE_IT = NUKE_IT;
const adminConfig_1 = require("../../Example/adminConfig");
const queryhandler_1 = __importDefault(require("../queryhandler"));
//ADMIN QUERIES
async function NUKE_IT(req, res) {
    queryhandler_1.default.ClearAllTable(req, res, adminConfig_1.adminConfig);
}
exports.default = {
    NUKE_IT
};
