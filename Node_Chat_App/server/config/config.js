var env = process.env.NODE_ENV || 'development';
console.log(`Environment is : ${env}` );

if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env];    // need to use bracket notation, [env], when we want to use variable to access JSON property

    // .key() parse the JSON properties into array of key
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];      //e.g. process.env.PORT = envConfig.PORT
    });
}