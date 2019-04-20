const utils = require('./utils.js');
const expect = require('expect');

// Define new test case
it('should add two numbers', () => {
    var result = utils.add(33, 11);

    // if (result !== 44){
    //     throw new Error(`Expected 44, but got ${result}.`);
    // }

    expect(result).toBe(44).toBeA('number');
});

// the done argument tells Mocha that this is a async test
// Mocha would not process the assertion until done gets called.
it('should async add two numbers', (done) => {
    utils.asyncAdd(4, 3, (sum) => {
        expect(sum).toBe(7).toBeA('number');
        done();
    })
});

it('should square a number', () => {
    var result = utils.square(3);

    // if (result !== 9){
    //     throw new Error(`Expected 9, but got ${result}.`);
    // }

    expect(result).toBe(9).toBeA('number');
});

it('should async square a number', (done) => {
    utils.asyncSquare(4, (result) => {
        expect(result).toBe(16).toBeA('number');
        done();
    })
});

it('should verify that first and last names are set', () => {
    var user = {
        age: 24,
        fullName: 'Aloysius Lim'
    };

    var result = utils.setName(user, user.fullName);

    expect(result).toBeA('object')
    .toInclude({
        firstName: 'Aloysius'
    }).toInclude({
        lastName: 'Lim'
    });
});