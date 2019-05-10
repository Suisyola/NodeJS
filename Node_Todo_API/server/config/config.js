var env = process.env.NODE_ENV || 'development';
console.log(`Environment is : ${env}` );

if (env === 'development') {
    process.env.PORT = 3000;
    //process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
    process.env.MONGODB_URI = 'mongodb+srv://admin:jiayou@cluster0-n7vld.mongodb.net/Node_Todo_API?retryWrites=true';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
} else if (env === 'production') {
    process.env.MONGODB_URI = 'mongodb+srv://admin:jiayou@cluster0-n7vld.mongodb.net/Node_Todo_API?retryWrites=true';
}