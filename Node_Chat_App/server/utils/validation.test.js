const expect = require('expect');

const isRealString = require('./validation.js').isRealString;

describe('isRealString', () => {

    it('should reject non-string values', () => {

        var result = isRealString(123);

        expect(result).toBe(false);
    });

    it('should reject string with only spaces', () => {

        var result = isRealString('   ');

        expect(result).toBe(false);
    });

    it('should reject string with non space characters', () => {

        var result = isRealString(' Lord of The Ring ');

        expect(result).toBe(true);
    });
});