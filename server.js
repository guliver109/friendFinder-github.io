//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//data base
var friends = require('./app/data/friends');
//console.log(friends);

//setup for express
var app = express();
var PORT = process.env.PORT || 3030;

//in the public folder available
app.use(express.static('./app/public'));

//express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//routes
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// start server on port number
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});