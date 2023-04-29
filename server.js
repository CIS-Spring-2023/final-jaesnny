// load the things we need
var express = require('express');
var app = express();
const bodyParser = require('body-parser');

// required module to make calls to a REST API
const axios = require('axios');

app.use(bodyParser.urlencoded());

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function (req, res) {
    var tagline = "Please log in to access the cargo management system.";
    res.render('pages/login', { tagline: tagline });
});

// get captain page
app.get('/captain', function (req, res) {

    //local API call to my Python REST API that delivers captain
    axios.get(`http://127.0.0.1:5000/captain`)
        .then((response) => {
            var captain = response.data;
            // use res.render to load up an ejs view file
            res.render('pages/captain.ejs', {
                captain: captain,
            });
        });
});

// get cargo page
app.get('/cargo', function (req, res) {

    //local API call to my Python REST API that delivers cargo
    axios.get(`http://127.0.0.1:5000/cargo`)
        .then((response) => {
            var cargo = response.data;
            // use res.render to load up an ejs view file
            res.render('pages/cargo.ejs', {
                cargo: cargo,
            });
        });
});

// get spaceship page
app.get('/spaceship', function (req, res) {

    //local API call to my Python REST API that delivers captain
    axios.get(`http://127.0.0.1:5000/spaceship`)
        .then((response) => {
            var spaceship = response.data;
            console.log(spaceship);
            // use res.render to load up an ejs view file
            res.render('pages/spaceship.ejs', {
                spaceship: spaceship,
            });
        });
});


app.listen(8080);
console.log('8080 is the magic port');
