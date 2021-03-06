const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if (err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }

        // result.ops stores all the document into database
        console.log(JSON.stringify(result.ops, undefined, 2));
    })

    db.close();
});