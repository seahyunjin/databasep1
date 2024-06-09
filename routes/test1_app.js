

// app.js
const express = require('express');
const db = require('../lib/db.js');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Edelweiss</h1>');
});

app.get('/coders', (req, res) => {
    db.query('SELECT * FROM coders', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: err });
        } else {
            res.status(200).json(results);
        }
    });
});

app.post('/coders', (req, res) => {
    const data = req.body;
    db.query('INSERT INTO coders SET ?', data, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: err });
        } else {
            res.status(200).json({ message: 'Data inserted successfully', id: results.insertId });
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

