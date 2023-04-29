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
                // pass message
                message: req.query.message
            });
        });
});

// add captain page
// app.get('/captain/add', function (req, res) {
//     res.render('pages/addcaptain');
// });

// app.post('/captain/add', function (req, res) {
//     // get form data
//     var firstname = req.body.firstname;
//     var lastname = req.body.lastname;
//     var space_rank = req.body.space_rank;
//     var homeplanet = req.body.homeplanet;
//     // make call to API to add captain
//     axios.post('http://127.0.0.1:5000/captain/add', {
//         firstname: firstname,
//         lastname: lastname,
//         space_rank: space_rank,
//         homeplanet: homeplanet
//     })
//     .then((response) => {
//         //redirect to captain page to verify if new row is added
//         res.redirect('/captain');
//     });
// });


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

//test
app.get('/captain/add', function (req, res) {
    res.render('pages/addcaptain.ejs');
});

//add captain (in progress)
// app.post('/captain/add', function (req, res) {
//     // create the data object to be inserted into the database
//     var captain = {};
//     captain.firstname = req.body.firstname;
//     captain.lastname = req.body.lastname;
//     captain.space_rank = req.body.space_rank;
//     captain.homeplanet = req.body.homeplanet;
  
//     console.log("Data: ", captain);
  
//     axios.post('http://127.0.0.1:5000/captain/add', JSON.stringify(captain), {
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
 app.post('/captain/delete', function(req, res) {
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
