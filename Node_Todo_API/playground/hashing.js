const SHA256 = require('crypto-js').SHA256;
const jwt = require('jsonwebtoken');

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Message: ${hash}`);

var data = {
    id: 4
};

var token = {
    'id': id,
    'hash': SHA256(JSON.stringify(data) + 'somesecret').toString()
};

var resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();
if (resultHash === token.hash) {
    console.log('Data was not changed');
} else {
    console.log('Data was changed');
}

var token = jwt.sign(data, '123abc');
var decoded = jwt.verify(token, '123abc');