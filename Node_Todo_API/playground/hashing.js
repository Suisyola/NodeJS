const SHA256 = require('crypto-js').SHA256;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashedPassword = '$2a$10$e6QrA9ttiWNjTz5vyeolKO/QHavn32VqMj1NbY9JXhfOVtQ.0nJV6';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Message: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     'id': id,
//     'hash': SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// var resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed');
// }

// var token = jwt.sign(data, '123abc');
// var decoded = jwt.verify(token, '123abc');