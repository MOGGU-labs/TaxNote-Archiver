import type { TableConfig } from './TableConfig';

const clientConfig: TableConfig = {
    model: 'clients',
    idField: 'id_client',
    uniqueFields: ['nama_client', 'npwp'],
    
    softDelete: true,
    softDeleteField: 'is_deleted',
    
    codeField: 'client_code',
    codePrefix: 'CLNT-',

    dateFields: ['created_at', 'updated_at'],
    
    defaultOrderField: 'updated_at',
    defaultOrderDirection: 'desc',
    
    requiredFields: ['nama_client','badan_usaha','npwp','nkp',],
    optionalFields: ['keterangan','telp','alamat']
    
};

export default clientConfig;
