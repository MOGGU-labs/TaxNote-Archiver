"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const queryhandler_1 = __importDefault(require("../queryhandler"));
const Config_1 = require("../../Example/Config");
//CASES QUERIES
async function getCases(req, res) {
    await queryhandler_1.default.getTable(req, res, Config_1.caseConfigs, false);
}
async function getDeletedCases(req, res) {
    await queryhandler_1.default.getTable(req, res, Config_1.caseConfigs, true);
}
async function postCases(req, res) {
    await queryhandler_1.default.postTable(req, res, Config_1.caseConfigs);
}
async function updateCasesByID(req, res) {
    await queryhandler_1.default.updateTableByID(req, res, Config_1.caseConfigs);
}
async function deleteCasesByID(req, res) {
    await queryhandler_1.default.softDeleteByID(req, res, Config_1.caseConfigs);
}
exports.default = {
    getCases,
    postCases,
    updateCasesByID,
    deleteCasesByID,
    getDeletedCases
};
