"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const caseConfig = {
    model: 'cases',
    idField: 'id_cases',
    uniqueFields: ['case_number'],
    softDelete: true,
    softDeleteField: 'is_deleted',
    codeField: 'case_number',
    codePrefix: 'CASE-'
};
exports.default = caseConfig;
