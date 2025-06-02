import type { TableConfig } from './TableConfig';

const caseConfig: TableConfig = {
    model: 'cases',
    idField: 'id_cases',
    uniqueFields: ['case_number'],
    softDelete: true,
    softDeleteField: 'is_deleted',
    codeField: 'case_number',
    codePrefix: 'CASE-',
    dateFields: ['created_at', 'updated_at'],
    defaultOrderField: 'updated_at',
    defaultOrderDirection: 'desc',
    requiredFields: ['id_client','case_author','case_name','case_type'],
    optionalFields: ['case_description'],
};

export default caseConfig;
