const ObjectID = require('mongodb').ObjectID;

const mongooose = require('./../server/db/mongoose.js').mongoose;
const Todo = require('./../server/models/todo').Todo;
const User = require('./../server/models/user').User;

var id = '5cd0437cac483864288b444e';
var userId = '5ccd1e898839344405628003a';

if (!ObjectID.isValid(id)){
    console.log('ID not valid');
}

Todo.find({
    _id : id
}).then((todos) => {
    console.log(JSON.stringify(todos, undefined, 2));
});

Todo.find({
    _id : id
}).then((todo) => {
    console.log(JSON.stringify(todo, undefined, 2));
});

Todo.findById(id).then((todo) => {

    // handle when cannot find todo document with the specific id
    if (!todo){
        return console.log('Id not found');
    }

    console.log(JSON.stringify(todo, undefined, 2));
}).catch((e) => {console.log(e)});

User.findById(userId).then((user) => {

    if (!user) {
        return console.log('User not found');
    }

    console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
    console.log(e);
}).catch((e) => { console.log(e) });