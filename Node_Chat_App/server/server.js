require('./config/config.js');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);      //creates a new socket.io instance attached to the http server

app.use(express.static(publicPath));

// register event listener - listen for new client that connects
io.on('connection', (socket) => {
    console.log('New user connected');

    //  Emit event (e.g. newEmail) to client
    socket.emit('newEmail', {
        from: 'aloy@email.com',
        text: 'whatsup!?',
        createdAt: 123
    });

    socket.emit('newMessage', {
        from: 'YouGotAMessage@email.com',
        text: 'secret message',
        createdAt: 123
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
    });

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