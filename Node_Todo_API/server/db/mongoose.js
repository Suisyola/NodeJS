var mongoose = require('mongoose');

// Use the native Promise instead of Mongoose's implementation of Promise
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose: mongoose
};