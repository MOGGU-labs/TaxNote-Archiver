import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'haikalsmp24',
    database: 'clientPajak',
});


