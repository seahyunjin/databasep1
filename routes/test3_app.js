const express = require('express');
const db = require('../lib/db1.js');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 경로 설정

// 기본 경로로 routes 디렉토리의 index.html 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 사용자 정보 조회
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error executing query:', err); // 오류 로그 추가
            res.status(500).json({ error: err });
        } else {
            res.status(200).json(results);
        }
    });
});

// 사용자 정보 추가
app.post('/users', (req, res) => {
    const data = req.body;
    db.query('INSERT INTO users SET ?', data, (err, results) => {
        if (err) {
            console.error('Error executing query:', err); // 오류 로그 추가
            res.status(500).json({ error: err });
        } else {
            res.status(200).json({ message: 'User added successfully', id: results.insertId });
        }
    });
});

// 사용자 정보 수정
app.put('/users/:id', (req, res) => {
    const data = req.body;
    const { id } = req.params;
    db.query('UPDATE users SET ? WHERE id = ?', [data, id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err); // 오류 로그 추가
            res.status(500).json({ error: err });
        } else {
            res.status(200).json({ message: 'User updated successfully' });
        }
    });
});

// 사용자 정보 삭제
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', id, (err, results) => {
        if (err) {
            console.error('Error executing query:', err); // 오류 로그 추가
            res.status(500).json({ error: err });
        } else {
            res.status(200).json({ message: 'User deleted successfully' });
        }
    });
});

app.use((req, res) => {
    res.status(404).send('<h1>Sorry, page not found :(</h1>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server starting at http://localhost:${PORT}`);
});
