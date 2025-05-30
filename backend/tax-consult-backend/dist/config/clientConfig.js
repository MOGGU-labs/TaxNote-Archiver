"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientConfig = {
    model: 'clients',
    idField: 'id_client',
    uniqueFields: ['nama_client', 'npwp'],
    softDelete: true,
    softDeleteField: 'is_deleted',
    codeField: 'client_code',
    codePrefix: 'CLNT-',
    dateFields: ['created_at', 'updated_at'],
    defaultOrderField: 'updated_at',
    defaultOrderDirection: 'desc'
};
exports.default = clientConfig;
