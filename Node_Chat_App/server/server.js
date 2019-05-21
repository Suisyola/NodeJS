require('./config/config.js');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const generateMessage = require('./utils/message.js').generateMessage;
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);      //creates a new socket.io instance attached to the http server

app.use(express.static(publicPath));

// register event listener - listen for new client that connects
io.on('connection', (socket) => {
    console.log('New user connected');

    var admin = 'Admin';

    //  Emit event (e.g. newMessage) to a client
    socket.emit('newMessage', generateMessage(admin, 'Welcome to the chat app'));

    // socket.broadcast.emit emits event to all connections except for the client that broadcast the event
    socket.broadcast.emit('newMessage', generateMessage(admin, 'New user joined'));

    socket.on('createMessage', (newMessage, callback) => {
        console.log('createMessage', newMessage);

        // io.emit emit event to all connections
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

        callback('This is from the server');
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