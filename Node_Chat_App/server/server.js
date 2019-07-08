require('./config/config.js');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const generateMessage = require('./utils/message.js').generateMessage;
const generateLocationMessage = require('./utils/message.js').generateLocationMessage;
const isRealString = require('./utils/validation').isRealString;
const Users = require('./utils/users').Users;
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);      //creates a new socket.io instance attached to the http server
var users = new Users();

app.use(express.static(publicPath));

// register event listener - listen for new client that connects
io.on('connection', (socket) => {
    console.log(`New user connected with socket id ${socket.id}`);

    var admin = 'Admin';

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        //  Emit event (e.g. newMessage) to a client
        socket.emit('newMessage', generateMessage(admin, 'Welcome to the chat app'));

        // socket.broadcast.emit emits event to all connections except for the client that broadcast the event
        //socket.broadcast.emit('newMessage', generateMessage(admin, 'New user joined'));

        console.log(`broadcasting to ${params.room}`);

        // socket.broadcast.emit emits event to all connections in the room except for the client that broadcast the event
        socket.broadcast.to(params.room).emit('newMessage', generateMessage(admin, `${params.name} has joined`));

        callback();
    });

    socket.on('createMessage', (newMessage, callback) => {
        console.log('createMessage', newMessage);

        // io.emit emit event to all connections
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
    });

    // listen for client that disconnect
    socket.on('disconnect', () => {
        console.log(`User disconnected with socket id ${socket.id}`);
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath+'/index.html'));
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});