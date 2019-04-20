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

it('should square a number', () => {
    var result = utils.square(3);

    // if (result !== 9){
    //     throw new Error(`Expected 9, but got ${result}.`);
    // }

    expect(result).toBe(9).toBeA('number');
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