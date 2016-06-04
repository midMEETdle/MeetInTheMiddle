'use strict'

const request = require('request');

let googleApiFunctions = {};

googleApiFunctions.getCoordinates = function(req, res, next) {
	let coordinateArray = [];

	request(req.body.inputUrlArray[0], function (error, response, body) {
		let locationDataObj = {};
		let data = JSON.parse(body);
		locationDataObj.coordinates = data.results[0].geometry.location;
		locationDataObj.city = data.results[0].address_components[1].long_name;
		console.log('city in google is ' + req.body.city);
		coordinateArray.push(locationDataObj);

		request(req.body.inputUrlArray[1], function (error, response, body) {
			locationDataObj = {};
			data = JSON.parse(body);
			locationDataObj.coordinates = data.results[0].geometry.location;
			coordinateArray.push(locationDataObj);
			console.log('coord array is ' + coordinateArray);
			req.body.coordinateArray = coordinateArray;
			next();
		})			
	})
};

//Implementing averaging of coordinates
googleApiFunctions.findCentralLocation = function(req, res, next) {
	for (var i = 0; i < req.body.coordinateArray.length; i++) {
	}
	next();
};

module.exports = googleApiFunctions;
