"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = require("express");
const onTest = __importStar(require("../Example/queriestest"));
const client_query_1 = __importDefault(require("../models/client_query"));
const case_query_1 = __importDefault(require("../models/case_query"));
exports.route = (0, express_1.Router)();
//Test Routes
exports.route.get('/data/status', onTest.checkStatus);
exports.route.post('/data', onTest.PostData);
exports.route.delete('/data', onTest.deleteAll);
exports.route.get('/data', onTest.getAllData);
//by :id
exports.route.get('/data/:id', onTest.getDataById);
exports.route.put('/data/:id', onTest.updateData);
exports.route.delete('/data/:id', onTest.deleteData);
//Clients Routes
exports.route.get('/clients/status', client_query_1.default.checkStatus);
exports.route.get('/clients', client_query_1.default.getClients);
exports.route.post('/clients', client_query_1.default.postClients);
//Cases Routes
exports.route.get('/cases/status', case_query_1.default.checkStatus);
//Consults Routes 
exports.route.get('/consults/status', case_query_1.default.checkStatus);
