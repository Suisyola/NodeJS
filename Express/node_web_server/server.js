const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

// register use of partial templates
hbs.registerPartials(__dirname + '/views/partials')

// use handlebar for view engine
app.set('view engine','hbs');

// use middleware
// express.static takes absolute path of file to serve.
//  __dirname stores the path to the project directory
app.use(express.static(__dirname + '/public'));

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// middleware to process HTTP request, response
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `Time now is ${now}. ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) => {
        if (err) {
            console.log("Unable to append to server.log");
        }
    });
    next();
});

// helpers are used to help to register functions to run
// for dynamically creating some output
// first arg: Name of helper
// second arg: Function to run
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getUTCFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// register handler for HTTP GET request
// first arg: URL
// second arg: function to run. What to send back to the HTTP GET request
app.get('/', (req, res) => {
    res.render('root.hbs', {
        pageTitle: 'Welcome Page',
        welcomeMessage: 'Welcome to the site!',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about_Aloysius', (req, res) => {
    res.send({
        name: 'Aloysius',
        likes: [
            'Gaming',
            'Tennis'
        ]
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/projectsPortfolio', (req, res) => {
    res.render('projectsPortfolio.hbs', {
        pageTitle: 'Projects Portfolio'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Got error liao!'
    })
})

// bind application to port on machine to listen
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});