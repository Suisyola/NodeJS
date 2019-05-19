var mongoose = require('mongoose');

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
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,   // indicate that this is a ObjectID type
        required: true
    }
});

module.exports = {
    "Todo": Todo
};