var expect = require('expect');

var generateMessage = require('./message.js').generateMessage;
var generateLocationMessage = require('./message.js').generateLocationMessage;

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

describe('generateLocationMessage', () => {

    it('should generate correct location object', () => {
        var from = 'someone@email.com';
        var latitude = '1.3664256';
        var longtitude = '103.8532608';

        var message = generateLocationMessage(from, latitude, longtitude);

        expect(message.from).toBe(from);
        expect(message.url).toContain(latitude);
        expect(message.url).toContain(longtitude);
        expect(typeof message.createdAt).toBe('number');
    });
});