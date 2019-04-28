const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if (err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    // FindOneAndUpdate : Update and get properties of the document deleted
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5cbf32f3652e251e4c5e5a54')
    }, {
            $set: {
                completed: true
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        });

    // FindOneAndUpdate : Update and get properties of the document deleted
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5cc3bfa3ab1f85dd39278601')
    }, {
            $set: { name: 'Bong Bong is a strong girl' },
            $inc: { age: 1 }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        });    

    // db.close();
});