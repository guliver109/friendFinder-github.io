//path package to get the correct file path
var path = require('path');

//include two routes
module.exports = function(app){

    //Default route that displays the home page. first to the AJAX Page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "/public/home.html"));
    });

  //route to display the survey page
    app.get('/survey', function (req, res) {
        res.sendFile(path.join(__dirname, "/public/survey.html"));
    });n

  // If no matching route is found default to home
    app.use(function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    });
};
