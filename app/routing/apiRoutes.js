var friends=require('../data/friends.js');

module.exports = function(app){

	app.get('/api/friends', function(req, res){
		res.json(friends);
	});

	app.post('/api/friends', function(req, res){
		var matchResult = {
			name: "",
			imgLink: "",
			differential: 1000
		};
	
		var apiRef = req.body;
		var apiScores = apiRef.scores;
		var differentialSum = 0;

		for(var i = 0; i < apiRef.scores.length; i++) {
			if(apiRef.scores[i] == "1 (Strongly Disagree)") {
				apiRef.scores[i] = 1;
			} else if(apiRef.scores[i] == "5 (Strongly Agree)") {
				apiRef.scores[i] = 5;
			} else {
				apiRef.scores[i] = parseInt(apiRef.scores[i]);
			}
		}

		for  (var i=0; i< friends.length; i++) {
			differentialSum = 0;

			for (var h=0; h<friends[i].scores[h]; h++){
				differentialSum += Math.abs(parseInt(apiScores[h]) - parseInt(friends[i].scores[h]));
				if (differentialSum <= matchResult.differential){
					matchResult.name = friends[i].name;
					matchResult.imgLink = friends[i].imgLink;
					matchResult.differential = differentialSum;
				}
			}
		}
		friends.push(apiRef);
		res.json(matchResult);
	});
}
