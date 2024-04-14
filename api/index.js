// src/index.js
const express = require('express');
const config = require('./config');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Worlds!');
});

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
});
