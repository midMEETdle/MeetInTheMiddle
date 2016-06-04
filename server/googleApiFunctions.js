const request = require('request');

let googleApiFunctions = {};

googleApiFunctions.getCoordinates = function(req, res, next) {
	request(req.body.inputUrl, function (error, response, body) {
		console.log(body);
		next();
	})
};

googleApiFunctions.findCentralLocation = function(req, res, next) {
};

module.exports = googleApiFunctions;
