import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: 'localhost',
    user: 'ADMIN001',
    password: '',
    database: 'catatandb'
});

