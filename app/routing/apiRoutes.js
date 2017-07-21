var friends = require("../data/friends.js");

module.exports = function(app) {

	app.get("/api/friends", function(req, res) {

        res.json(friends);

    });

    app.post("/api/friends", function(req, res) {
    	
    	var smallestDifference = 1000;
        var bestMatch;
    	var differenceArray = [];

        var scoreInt = req.body['score[]'].map(function(num) {
            return parseInt(num);
        });

        for (var i = 0; i < friends.length; i++) {

            var matchScoreInt = friends[i]['score[]'].map(function(num) {
                return parseInt(num);
            });

            for (var j = 0; j < scoreInt.length; j++) {

                var difference = scoreInt[j] - matchScoreInt[j];

                if (difference < 0) {

                    difference = difference * -1;

                }

                differenceArray.push(difference);

            }

            var totalDifference = differenceArray.reduce(function(sum, value) {
                return sum + value;
            });

            if (totalDifference <= smallestDifference) {

                smallestDifference = totalDifference;

                bestMatch = friends[i];

            }


            differenceArray = [];

        }

        res.json(bestMatch);

        friends.push(req.body);

    });

}
