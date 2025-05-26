"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const queryhandler_1 = __importDefault(require("../queryhandler"));
const Config_1 = require("../../Example/Config");
//CLIENTS QUERIES
async function getClients(req, res) {
    await queryhandler_1.default.getTable(req, res, Config_1.clientConfigs, false);
}
async function getdeletedClients(req, res) {
    await queryhandler_1.default.getTable(req, res, Config_1.clientConfigs, true);
}
async function postClients(req, res) {
    await queryhandler_1.default.postTable(req, res, Config_1.clientConfigs);
}
async function updateClientByID(req, res) {
    await queryhandler_1.default.updateTableByID(req, res, Config_1.clientConfigs);
}
async function deleteClientByID(req, res) {
    await queryhandler_1.default.softDeleteByID(req, res, Config_1.clientConfigs);
}
exports.default = {
    getClients,
    getdeletedClients,
    postClients,
    updateClientByID,
    deleteClientByID
};
