require('./config/config.js');

const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

var mongoose = require('./db/mongoose.js').mongoose;
var Todo = require('./models/todo.js').Todo;
var User = require('./models/user.js').User;
var authenticate = require('./middleware/authenticate').authenticate;

var app = express();
const port = process.env.PORT;

// use the body-parser middleware. It converts request body to JSON Object
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);

    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        console.log(JSON.stringify(doc, undefined, 2));
        res.status(200).send(doc);
    }, (error) => {
        console.log('Unable to save todo', error);
        res.status(400).send(error);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200).send({
            todos: todos
        });
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)){

        // return so that below code doesn't get executed since ID is not valid
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {

        if (!todo) {

            // return to prevent below code from executing
            return res.status(404).send();
        }
    
        res.status(200).send({
            todo: todo
        });

    }, (e) => {
        res.status(400).send({});
    }).catch((e) => { res.status(400).send() });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.status(200).send({
            todo: todo
        });
    }, (e) => {
        res.status(400).send({});
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;

    // pick is to pick a property (i.e. text property if exists) from the request's body
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    console.log(JSON.stringify(body, undefined, 2));

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
        .then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            res.send({'todo' : todo});
        }).catch((e) => {
            res.status(400).send();
        });
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    var user = new User(body);

    user.save().then(() => {
        console.log(JSON.stringify(user, undefined, 2));
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((error) => {
        console.log('Unable to save user', error);
        res.status(400).send(error);
    });
});



app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app: app
};