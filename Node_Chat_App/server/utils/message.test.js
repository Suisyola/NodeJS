var expect = require('expect');

var generateMessage = require('./message.js').generateMessage;

describe('generateMessage', () => {

    it('should generate correct message object', () => {
        var from = 'someone@email.com';
        var text = 'Welcome';

        var message = generateMessage(from, text);

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(typeof message.createdAt).toBe('number');
    });
});