"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const queryhandler_1 = __importDefault(require("../queryhandler"));
const Config_1 = require("../../Example/Config");
//CONSULTS QUERIES
async function getConsults(req, res) {
    await queryhandler_1.default.getTable(req, res, Config_1.consultConfigs, false);
}
async function getDeletedConsults(req, res) {
    await queryhandler_1.default.getTable(req, res, Config_1.consultConfigs, true);
}
async function postConsults(req, res) {
    await queryhandler_1.default.postTable(req, res, Config_1.consultConfigs);
}
async function updateConsultsByID(req, res) {
    await queryhandler_1.default.updateTableByID(req, res, Config_1.consultConfigs);
}
async function deleteConsultsByID(req, res) {
    await queryhandler_1.default.softDeleteByID(req, res, Config_1.consultConfigs);
}
exports.default = {
    getConsults,
    getDeletedConsults,
    updateConsultsByID,
    deleteConsultsByID,
    postConsults
};
