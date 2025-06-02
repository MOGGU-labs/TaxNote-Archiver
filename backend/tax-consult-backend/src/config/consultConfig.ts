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
    
    requiredFields: [''],
    optionalFields: ['']
};

export default consultConfig;
