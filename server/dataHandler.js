'use strict'

const privateKeys = require('./../privateKeys.js');

let dataHandler = {};

dataHandler.parseInput = function (req, res, next) {
	const googleApiKey = privateKeys.googleApiKey;
	let baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
	let urlArray = [];

	console.log(req.body);

	for (let i = 0; i < req.body.inputArray.length; i++) {
		let url = baseUrl;
		for (let key in req.body.inputArray[i]) {
			if (key !== 'name') {
				url += req.body.inputArray[i][key].replace(/ /g, '+');
				if (key !== 'state') url += ',';
			}
		}
		url += '&key' + googleApiKey;
		console.log(url);
		urlArray.push(url);
	}

	req.body.inputUrlArray = urlArray;
	next();
};

dataHandler.sendOutput = function (req, res, next) {
	const outputObject = {
		centralCoordinates: {
			latitude: req.body.averageLocation[0],
			longitude: req.body.averageLocation[1],
		},
		meetSuggestions: req.body.businessArray,
	}
	res.send(outputObject);
}

module.exports = dataHandler;
