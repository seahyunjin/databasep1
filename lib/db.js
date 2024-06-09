// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1', // MySQL 서버 주소
    user: 'root', // MySQL 사용자 이름
    password: '12345678', // MySQL 비밀번호
    database: 'mydatabase' // 사용할 데이터베이스 이름
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = connection;

