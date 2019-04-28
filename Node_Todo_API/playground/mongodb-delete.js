const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if (err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    // deleteMany : Delete all documents that match 
    db.collection('Todos').deleteMany({text: 'eat lunch'}).then(
        (result) => {
            console.log(result);
        }, 
        (err) => {
            console.log('Failed to delete many');
        });


    // deleteOne : Delete first document that match
    db.collection('Todos').deleteOne({text: 'eat lunch'}).then(
        (result) => {
            console.log(result);
        }, 
        (err) => {
            console.log('Failed to delete one');
        });

    // FindOneAndDelete : Delete and get properties of the document deleted
    db.collection('Todos').findOneAndDelete({text: 'eat lunch'}).then(
        (result) => {
            console.log(JSON.stringify(result, undefined, 2));
        }, 
        (err) => {
            console.log('Failed to delete one');
        });

    // db.close();
});