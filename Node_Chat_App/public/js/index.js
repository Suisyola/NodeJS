var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createEmail', {
        to: 'someone@email.com',
        text: 'Hi there!'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
});

socket.on('welcomeMessageToUser', function (message) {
    console.log('Welcome!', message);
});

socket.on('broadcastWelcomeMessageToUsers', function (message) {
    console.log('Let\'s welcome our new user', message);
});