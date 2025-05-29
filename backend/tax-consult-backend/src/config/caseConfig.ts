import type { TableConfig } from './TableConfig';

const caseConfig: TableConfig = {
    model: 'cases',
    idField: 'id_cases',
    uniqueFields: ['case_number'],
    softDelete: true,
    softDeleteField: 'is_deleted',
    codeField: 'case_number',
    codePrefix: 'CASE-'
};

export default caseConfig;
