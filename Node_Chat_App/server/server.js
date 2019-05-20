require('./config/config.js');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// register event listener - listen for new client that connects
io.on('connection', (socket) => {
    console.log('New user connected');

    // listen for client that disconnect
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath+'/index.html'));
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});