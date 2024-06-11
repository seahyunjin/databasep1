const express = require('express');
const db = require('../lib/db.js');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname))); // 현재 디렉토리를 정적 파일 경로로 설정

// 기본 경로로 index.html 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index1.html'));
});

// 리뷰 정보 조회
app.get('/reviews', (req, res) => {
    db.query('SELECT * FROM reviews', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: err });
        } else {
            res.status(200).json(results);
        }
    });
});

// 리뷰 정보 추가
app.post('/reviews', (req, res) => {
    const data = req.body;
    console.log('Received data:', data); // 데이터 확인 로그
    db.query('INSERT INTO reviews SET ?', data, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: err });
        } else {
            console.log('Data inserted:', results); // 성공 시 로그
            res.status(200).json({ message: 'Review added successfully', id: results.insertId });
        }
    });
});

// 리뷰 정보 수정
app.put('/reviews/:id', (req, res) => {
    const data = req.body;
    const { id } = req.params;
    console.log('Updating data:', data); // 데이터 확인 로그
    db.query('UPDATE reviews SET ? WHERE review_id = ?', [data, id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: err });
        } else {
            console.log('Data updated:', results); // 성공 시 로그
            res.status(200).json({ message: 'Review updated successfully' });
        }
    });
});

// 리뷰 정보 삭제
app.delete('/reviews/:id', (req, res) => {
    const { id } = req.params;
    console.log('Deleting review with id:', id); // 삭제 데이터 확인 로그
    db.query('DELETE FROM reviews WHERE review_id = ?', id, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: err });
        } else {
            console.log('Data deleted:', results); // 성공 시 로그
            res.status(200).json({ message: 'Review deleted successfully' });
        }
    });
});

app.use((req, res) => {
    res.status(404).send('<h1>Sorry, page not found :(</h1>');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server starting at http://localhost:${PORT}`);
});
