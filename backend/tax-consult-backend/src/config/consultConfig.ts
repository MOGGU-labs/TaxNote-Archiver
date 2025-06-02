import type { TableConfig } from './TableConfig';

const consultConfig: TableConfig = {
    model: 'consults',
    idField: 'id_consults',
    uniqueFields: ['consult_code'],

    softDelete: true,
    softDeleteField: 'is_deleted',

    codeField: 'consult_code',
    codePrefix: 'CNSLT-',

    dateFields: ['consult_date', 'created_at', 'updated_at'],

    defaultOrderField: 'updated_at',
    defaultOrderDirection: 'desc',
    
    requiredFields: ['id_cases','tujuan_consult','konsultan_consult','tanggal_consult',],
    optionalFields: ['keterangan_consult','hasil_consult'],

};

export default consultConfig;
