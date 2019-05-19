const ObjectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');

const Todo = require('./../../models/todo').Todo;
const User = require('./../../models/user').User;

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'aloy@learnnodejs.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access:'auth'}, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    email: 'qin@learnnodejs.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access:'auth'}, process.env.JWT_SECRET).toString()
    }]
}];

const todos = [{
    _id : new ObjectID(),
    text: 'First test todo',
    _creator: users[0]._id
}, {
    _id : new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: users[1]._id
}];

const populateTodos = (done) => {              // executed beforeEach test case.
    Todo.deleteMany({})
        .then(() => {
            return Todo.insertMany(todos);
        })
        .then(() => {    // clear the database because test case assumes there is no document in db
            done();
        });
}

const populateUsers = ((done) => {
    User.deleteMany({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        // .all waits for all Promises in the array (i.e. userOne & userTwo) to resolve
        return Promise.all([userOne, userTwo]);
    }).then(() => {return done()});
});

module.exports = {
    "todos": todos,
    "populateTodos": populateTodos,
    "users": users,
    "populateUsers": populateUsers
}