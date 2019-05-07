var mongoose = require('mongoose');

// Use the native Promise instead of Mongoose's implementation of Promise
mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb+srv://admin:P@ssw0rd@cluster0-n7vld.mongodb.net/test?retryWrites=true');

module.exports = {
    mongoose: mongoose
};