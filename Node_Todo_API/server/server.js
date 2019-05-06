var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose.js').mongoose;
var Todo = require('./models/todo.js').Todo;
var User = require('./models/user.js').User;

var app = express();

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

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {
    app: app
};