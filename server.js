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

//update cargo

//delete cargo
app.get('/cargo/delete', function (req, res) {
    res.render('pages/deletecargo.ejs')
});
app.post('/cargo/delete', function (req, res) {
    // get the ID of captain that user wants to delete
    var id = req.body.id;

    // delete request with captain ID that user input
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

//insert captain (in progress)
app.get('/captain/add', function (req, res) {
    res.render('pages/addcaptain.ejs')
});
// app.post('/captain/add', (req, res) => {
//     const { firstname, lastname, space_rank, homeplanet } = req.body;
    
//     const sql = "INSERT INTO captain (firstname, lastname, space_rank, homeplanet) VALUES (?, ?, ?, ?)";
//     const values = [firstname, lastname, space_rank, homeplanet];
    
//     connection.query(sql, values, (error, results) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Error adding captain" });
//       }
      
//       return res.status(200).json({ message: "Captain added successfully" });
//     });
//   });
  
// app.post('/captain/add', function (req, res) {
//     // create the data object to be inserted into the database
//     var captain = {};
//     captain.firstname = req.body.firstname;
//     captain.lastname = req.body.lastname;
//     captain.space_rank = req.body.space_rank;
//     captain.homeplanet = req.body.homeplanet;
  
//     console.log("Data: ", captain.firstname, captain.lastname, captain.space_rank, captain.homeplanet);
  
//     axios.post('http://127.0.0.1:5000/captain/add', captain.firstname, captain.lastname, captain.space_rank, captain.homeplanet, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(response => {
//         console.log('Response:', response);
//         // handle success
//         res.redirect('/captain');
//       })
//       .catch(error => {
//         // handle error
//         console.error(error);
//         res.redirect('/captain?message=Error adding captain.');
//       });
//   });

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
            res.redirect('/captain?message=Error deleting captain.');
        });
});

// update captain page
app.get('/captain/update', function (req, res) {
    res.render('pages/updatecaptain.ejs')
});




//TESTTTT
// process form submission to update captain info
// app.post('/captain/update', function(req, res) {
//     // get the ID of the captain to be updated from the request body
//     var id = req.body.id;

//     // get the updated information for the captain from the request body
//     var firstname = req.body.firstname;
//     var lastname = req.body.lastname;
//     var space_rank = req.body.space_rank;
//     var homeplanet = req.body.homeplanet;

//     // make a PUT request to update the captain's information with the new data
//     axios.put(`http://127.0.0.1:5000/captain/update/${id}`, {
//             name: name,
//             rank: rank,
//             ship: ship
//         })
//         .then(response => {
//             // handle success
//             res.redirect('/captain');
//         })
//         .catch(error => {
//             // handle error
//             console.error(error);
//             res.redirect('/captain?message=Error updating captain.');
//         });
// });


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

//update spaceship

//delete spaceship
app.get('/spaceship/delete', function (req, res) {
    res.render('pages/deletespaceship.ejs')
});
app.post('/spaceship/delete', function (req, res) {
    // get the ID of captain that user wants to delete
    var id = req.body.id;
    console.log(id);
    // delete request with captain ID that user input
    axios.delete(`http://127.0.0.1:5000/spaceship/delete/${id}`)
        .then(response => {
            // redirect to table to confirm that row did delete
            res.redirect('/spaceship');
        })
        .catch(error => {
            // handle error
            console.error(error);
            res.redirect('/captain?message=Error deleting spaceship.');
        });
});

app.listen(8080);
console.log('8080 is the magic port');