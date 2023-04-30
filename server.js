// load the things we need
var express = require('express');
var app = express();
const bodyParser = require('body-parser');

// required module to make calls to a REST API
const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function (req, res) {
    var tagline = "Please log in to access the cargo management system.";
    res.render('pages/login', { tagline: tagline });
});

// CARGO CRUD OPERATIONS

//get cargo page
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

//insert cargo
//renders add cargo form
app.get('/cargo/add', function (req, res) {
    res.render('pages/addcargo')
});

app.post('/cargo/add', function (req, res) {
    //variables for fields in the database
    //setting them equal to what the user entered in the form
    cargo = req.body;
    let weight = cargo.weight;
    let cargotype = cargo.cargotype;
    let departure = cargo.departure;
    let arrival = cargo.arrival;
    let shipid = cargo.shipid;
    //axios.post to post the data to the database
    //has url set to backend host and adding api
    axios.post('http://127.0.0.1:5000/cargo/add', {
        //setting keyvalue pairs equal to data
        "weight": weight,
        "cargotype": cargotype,
        "departure": departure,
        "arrival": arrival,
        "shipid": shipid
    }).then((response) => {
        //sends user back to the /cargo page
        res.redirect('/cargo')
    });
});

//update cargo
app.get('/cargo/update', function (req, res) {
    res.render('pages/updatecargo.ejs')
});

app.post('/cargo/update', function (req, res) {
    //variables for fields in the database
    //setting them equal to what the user entered in the form
    cargo = req.body;
    let weight = cargo.weight;
    let cargotype = cargo.cargotype;
    let departure = cargo.departure;
    let arrival = cargo.arrival;
    let shipid = cargo.shipid;
    //axios.post to post the data to the database
    //has url set to backend host and adding api
    axios.put('http://127.0.0.1:5000/cargo/update', {
        //setting keyvalue pairs equal to data
        "weight": weight,
        "cargotype": cargotype,
        "departure": departure,
        "arrival": arrival,
        "shipid": shipid
    }).then((response) => {
        //sends user back to the /cargo page
        res.redirect('/cargo')
    });
});

//delete cargo
app.get('/cargo/delete', function (req, res) {
    res.render('pages/deletecargo.ejs')
});

app.post('/cargo/delete', function (req, res) {
    // get the ID of cargo that user wants to delete
    var id = req.body.id;

    // delete request with cargo ID that user input
    axios.delete(`http://127.0.0.1:5000/cargo/delete/${id}`)
        .then(response => {
            // redirect to table to confirm that row did delete
            res.redirect('/cargo');
        })
        .catch(error => {
            // handle error
            console.error(error);
            res.redirect('/cargo?message=Error deleting cargo.');
        });
});


// CAPTAIN CRUD OPERATIONS


//get captain page
app.get('/captain', function (req, res) {

    //local API call to my Python REST API that delivers captain
    axios.get(`http://127.0.0.1:5000/captain`)
        .then((response) => {
            var captain = response.data;
            // use res.render to load up an ejs view file
            res.render('pages/captain.ejs', {
                captain: captain,
                // pass message
                message: req.query.message
            });
        });
});

//insert captain
//renders add captain form
app.get('/captain/add', function (req, res) {
    res.render('pages/addcaptain')
});

app.post('/captain/add', function (req, res) {
    //variables for fields in the database
    //setting them equal to what the user entered in the form
    captain = req.body;
    var firstname = captain.firstname;
    var lastname = captain.lastname;
    var space_rank = captain.space_rank;
    var homeplanet = captain.homeplanet;
    //axios.post to post the data to the database
    //has url set to backend host and adding api
    axios.post('http://127.0.0.1:5000/captain/add', {
        //setting keyvalue pairs equal to data
        "firstname": firstname,
        "lastname": lastname,
        "space_rank": space_rank,
        "homeplanet": homeplanet
    }).then((response) => {
        //sends user back to the /captain page
        res.redirect('/captain')
    });
});

//delete captain
app.get('/captain/delete', function (req, res) {
    res.render('pages/deletecaptain.ejs')
});
app.post('/captain/delete', function (req, res) {
    // get the ID of captain that user wants to delete
    var id = req.body.id;

    // delete request with captain ID that user input
    axios.delete(`http://127.0.0.1:5000/captain/delete/${id}`)
        .then(response => {
            // redirect to table to confirm that row did delete
            res.redirect('/captain');
        })
        .catch(error => {
            // handle error
            console.error(error);
            if (error.response.data.message.includes("foreign key constraint fails")) {
                res.redirect('/captain/delete-error');
            } else {
                res.redirect('/captain?message=Error deleting captain.');
            }
        });
});


// update captain page
app.get('/captain/update', function (req, res) {
    res.render('pages/updatecaptain.ejs', {})
});

// Update captain via POST request
app.post('/captain/update', function (req, res) {
    // Retrieve the updated captain data from the form
    captain = req.body()
    var firstname = captain.firstname;
    var lastname = captain.lastname;
    var space_rank = captain.space_rank;
    var homeplanet = captain.homeplanet;    

    // Make a PUT request to update the captain data
    axios.put('http://127.0.0.1:5000/captain', updatedCaptain)
        .then(function (response) {
            console.log(response.data);
            res.redirect('/captain');
        })
        .catch(function (error) {
            console.log(error);
        });
});

// Update captain via PUT request
app.put('/captain/:id', function (req, res) {
    // Retrieve the updated captain data from the request body
    const updatedCaptain = {
        id: req.params.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        space_rank: req.body.space_rank,
        homeplanet: req.body.homeplanet
    };
});


// SPACESHIP CRUD OPERATIONS

//get spaceship page
app.get('/spaceship', function (req, res) {

    //local API call to my Python REST API that delivers captain
    axios.get(`http://127.0.0.1:5000/spaceship`)
        .then((response) => {
            var spaceship = response.data;
            // use res.render to load up an ejs view file
            res.render('pages/spaceship.ejs', {
                spaceship: spaceship,
            });
        });
});

//insert spaceship
app.get('/spaceship/add', function (req, res) {
    res.render('pages/addspaceship', {});
});

app.post('/spaceship/add', function (res, req) {
    //variables for fields in the database
    //setting them equal to what the user entered in the form
    spaceship = req.body;
    const maxweight = parseInt(spaceship.maxweight);
    var captainid = spaceship.captainid;
    //axios.post to post the data to the database
    //has url set to backend host and adding api
    axios.post('http://127.0.0.1:5000/spaceship/add', {
        //setting keyvalue pairs equal to data
        "maxweight": maxweight,
        "captainid": captainid
    })
        .then(function (response) {
             //sends user back to the /spaceship page
            res.render('pages/spaceship')
        });
});

//update spaceship
app.get('/spaceship/update', function (req, res) {
    res.render('pages/updatespaceship.ejs')
});

//delete spaceship
app.get('/spaceship/delete', function (req, res) {
    res.render('pages/deletespaceship.ejs')
});

app.post('/spaceship/delete', function (req, res) {
    // get the ID of the spaceship that the user wants to delete
    var id = req.body.id;
    // delete request with spaceship ID that the user input
    axios.delete(`http://127.0.0.1:5000/spaceship/delete/${id}`)
        .then(response => {
            // redirect to table to confirm that the row was deleted
            res.redirect('/spaceship');
        })
        .catch(error => {
            // handle error
            console.error(error);
            res.redirect('/spaceship?message=Error deleting spaceship.');
        });
});

app.listen(8080);
console.log('8080 is the magic port');