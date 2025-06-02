import type { TableConfig } from './TableConfig';

const clientConfig: TableConfig = {
    //table model and fields
    model: 'clients',
    idField: 'id_client',
    uniqueFields: ['nama_client', 'npwp'],
    //softdelete
    softDelete: true,
    softDeleteField: 'is_deleted',
    //code generator
    codeField: 'client_code',
    codePrefix: 'CLNT-',
    //date format
    dateFields: ['created_at', 'updated_at'],
    //order
    defaultOrderField: 'updated_at',
    defaultOrderDirection: 'desc',
    
    requiredFields: ['nama_client','npwp','nkp'],
    optionalFields: ['keterangan','telp','alamat','badan usaha']
    
};

export default clientConfig;
