"use strict";
//import * as onTest from '../Example/queriestest'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = require("express");
exports.route = (0, express_1.Router)();
/*
//Test Routes
route.get('/data/status',onTest.checkStatus);
route.post('/data',onTest.PostData);
route.delete('/data',onTest.deleteAll);
route.get('/data',onTest.getAllData);
//by :id
route.get('/data/:id',onTest.getDataById);
route.put('/data/:id',onTest.updateData);
route.delete('/data/:id',onTest.deleteData);
*/
//Basic--QueryModules
const client_query_1 = __importDefault(require("../models/old/client_query"));
const case_query_1 = __importDefault(require("../models/old/case_query"));
const consult_query_1 = __importDefault(require("../models/old/consult_query"));
//Admin--QueryModules
const admin_1 = __importDefault(require("../models/old/admin"));
const queryhandler_1 = require("../models/queryhandler");
//========================= Clients Routes =========================//
exports.route.get('/clients', client_query_1.default.getClients);
exports.route.post('/clients', client_query_1.default.postClients);
//by :id
exports.route.put('/clients/:id', client_query_1.default.updateClientByID);
exports.route.delete('/clients/:id', client_query_1.default.deleteClientByID);
//extra
exports.route.get('/clients/deleted', client_query_1.default.getdeletedClients);
//========================= Cases Routes =========================//
exports.route.get('/cases', case_query_1.default.getCases);
exports.route.post('/cases', case_query_1.default.postCases);
//by :id
exports.route.put('/cases/:id', case_query_1.default.updateCasesByID);
exports.route.delete('/cases/:id', case_query_1.default.deleteCasesByID);
//extra
exports.route.get('/cases/deleted', case_query_1.default.getDeletedCases);
//========================= Consults Routes =========================//
exports.route.get('/consults', consult_query_1.default.getConsults);
exports.route.post('/consults', consult_query_1.default.postConsults);
//by :id
exports.route.put('/consults/:id', consult_query_1.default.updateConsultsByID);
exports.route.delete('/consults/:id', consult_query_1.default.deleteConsultsByID);
//extra
exports.route.get('/consults/deleted', consult_query_1.default.getDeletedConsults);
////=========================Special Routes=========================//
exports.route.get('/status', queryhandler_1.checkStatus);
exports.route.delete('/nuke', admin_1.default.NUKE_IT);
