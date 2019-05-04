var mongoose = require('mongoose');

// Use the native Promise instead of Mongoose's implementation of Promise
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

// First arg: Name of Collection
// Second arg: Schema of Collection
var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

var newTodo = new Todo({
    text: 'Cook dinner'
})

var otherTodo = new Todo({
    text: 'Learn NodeJS',
    completed: true,
    completedAt: 131
})

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (error) => {
//     console.log('Unable to save todo');
// });

otherTodo.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (error) => {
    console.log('Unable to save todo', error);
});