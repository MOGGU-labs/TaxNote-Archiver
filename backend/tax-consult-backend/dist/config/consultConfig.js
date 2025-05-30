"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consultConfig = {
    model: 'consults',
    idField: 'id_consults',
    uniqueFields: ['consult_code'],
    softDelete: true,
    softDeleteField: 'is_deleted',
    codeField: 'consult_code',
    codePrefix: 'CNSLT-',
    dateFields: ['consult_date', 'created_at', 'updated_at']
};
exports.default = consultConfig;
