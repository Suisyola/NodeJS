const ObjectID = require('mongodb').ObjectID;

var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose.js').mongoose;
var Todo = require('./models/todo.js').Todo;
var User = require('./models/user.js').User;

var app = express();
const port = process.env.PORT || 3000;

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

app.listen(3000, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app: app
};