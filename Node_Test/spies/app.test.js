const expect = require('expect');
const rewire = require('rewire');

// rewire adds 2 properties to the js, __set__ and __get__
var app = rewire('./app.js');

describe('App', () => {

    // create spy for saveUser property as this is the function to mock
    var db = {
        saveUser: expect.createSpy()
    };
    // set db variable in app.js to a variable with the spy function
    app.__set__('db', db);

    it('should call the spy correctly', () => {
        var spy = expect.createSpy();
        spy();
        expect(spy).toHaveBeenCalled();
    });

    it('should call saveUser with user object', () => {
        var email = 'andrew@example.com';
        var password = '123abc';

        // invoke method to test
        app.handleSignup(email, password);

        // expect the function in the method to test to have 
        //been passed the correct parameters
        expect(db.saveUser).toHaveBeenCalledWith({
            email: email,
            password: password
        })
    });

});