//link to array that holds friends data
var friends = require("/data/friends.js");

//contain two routes
module.exports = function (app) {

    //display a JSON of all possible friends
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });

    //post route to handle incoming survey results
    app.post("/api/friends", function (req, res) {
        //console.log("Hey");
            
            // new friend who is fillng the survey
            var newFriend = req.body;
            //console.log(newFriend);
            
            //saving users imput for compare
            var match = [];
            
            // for sorting input and match for results
            for (let i = 0; i < newFriend.score.length; i++) {
                if (newFriend.score[i] == "1 (Not so Perfrect Match)") {
                    newFriend.score[i] = 1;
                } else if (newFriend.score[i] == "5 (You are Perfrect Match)") {
                    newFriend.score[i] = 5;
                } else {
                    newFriend.score[i] = parseInt(newFriend.score[i]);
                }
            }

            //to compare scores with rest of the friends from array
            var perfectMatch = 0;

            //difference variable
            //(biggest diference from 1-5 is 4 multiplied with 10 questions)
            var matchDifference = 40;

            //nested loop for comparing friends from array
            for (let i = 0; i < friends[i].length; i++) {
                
                //setting difference variable
                var difference = 0;

                for (let y = 0; y < friends[i].score.length; y++){
                    var diffScore = Math.abs(friends[i].score[y] - newFriend.score[y]);
                    difference += diffScore;
                }
                //if les than the best match save difference and index
                if (difference < matchDifference) {
                    perfectMatch = i;
                    matchDifference = difference;
                }
            }
            //best match data from friend
            match = friends[perfectMatch];
            
            //new friend in array of friends
            friends.push(newFriend);
            
            //return perfect match
            res.json(match);
    });
}
