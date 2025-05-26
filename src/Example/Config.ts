export const clientConfigs = {
    idfield: 'id_client',
    tableName: 'clients',
    requiredFields: ['nama_client', 'badan_usaha', 'telp', 'alamat', 'npwp', 'nkp'],
    optionalFields: ['keterangan'], // These can be omitted or empty
    uniqueFields: ['npwp'],
    softdeleteFields: 'is_deleted',
    codeField: 'client_code',
    codePrefix: 'CLNT'
};
export const caseConfigs = {
    idfield: 'id_cases',
    tableName: 'cases',
    requiredFields: ['id_client', 'case_author', 'case_name'],
    optionalFields: ['case_type','case_description'], // Optional description of the case
    uniqueFields: ['case_name'], // one client can't have two cases with the same name
    softdeleteFields: 'is_deleted',
    foreignkey: {
        field: 'id_client',
        reftable:'client'
    },
    codeField: 'case_number',
    codePrefix: 'CASE'
};
export const consultConfigs = {
    idfield: 'id_consults',
    tableName: 'consults',
    foreignkey: 'id_cases',
    requiredFields: ['id_cases', 'tujuan_consult', 'konsultan_consult', 'consult_date'],
    optionalFields: ['keterangan_consult', 'hasil_consult'], // / These can be omitted or empty
    uniqueFields: ['id_consults'], 
    softdeleteFields: 'is_deleted'
};


/*
REF
================== Client ==================
TABLE : clients,
Columns :{
id_client,
nama_client,
badan_usaha,
telp,alamat,
npwp,
nkp,
keterangan,
created_at,
updated_at,
is_deleted, 
deleted_at
}
================== Client ==================
+
================== Cases ==================
TABLE : cases,
COLUMNS :{
id_cases,
id_client (),
case_name,        
case_type,
case_description,
created_at,
updated_at,
is_deleted,
deleted_at
}
================== Cases ==================
+
================== Consults ==================
TABLE : consults,
COLUMNS :{
id_consults,
id_cases,
tujuan_consult,
keterangan_consult,
hasil_consult,
konsultan_consult,
consult_date,
created_at,
updated_at,
is_deleted,
deleted_at
}
================== Consults ==================
*/
