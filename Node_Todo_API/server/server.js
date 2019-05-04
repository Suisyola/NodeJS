var mongoose = require('mongoose');

// Use the native Promise instead of Mongoose's implementation of Promise
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

// First arg: Name of Collection
// Second arg: Schema of Collection
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

var otherTodo = new Todo({
    text: 'Learn NodeJS',
    completed: true,
    completedAt: 131
})

var newUser = new User({
    email: 'learning@nodejs.com'
})

otherTodo.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (error) => {
    console.log('Unable to save todo', error);
});

newUser.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (error) => {
    console.log('Unable to save user', error);
});