// load the things we need
var express = require('express');
var app = express();
const bodyParser  = require('body-parser');

// required module to make calls to a REST API
const axios = require('axios');

app.use(bodyParser.urlencoded());

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    //res.render("pages/index.ejs", {});
    res.render("pages/login.ejs", {});
});


app.post('/process_form', function(req, res){
    //get json file
    var url = "https://dummyjson.com/carts";
    axios.get(url)
    .then(response => {
        const { carts } = response.data;
        const averages = carts.map(cart => {
           // retrieve data from json file of each cart's discounted total and total quantity 
            const { discountedTotal, totalQuantity } = cart;
            // get average from discounted total and total quantity
            const avg = discountedTotal / totalQuantity;
            //return info using cart id and average limiting to two decimal places
            return { id: cart.id, average: avg.toFixed(2) };
        });
        // render to results page
        res.render('pages/results.ejs', { averages });
    });
});
           

app.listen(8080);
console.log('8080 is the magic port');