var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createEmail', {
        to: 'someone@email.com',
        text: 'Hi there!'
    });

    socket.emit('createMessage', {
        from: 'replyYourMessage@email.com',
        text: 'Noted'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newEmail', function (email) {
    console.log('New email', email);
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
});