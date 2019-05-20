require('./config/config.js');

const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath+'/index.html'));
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});