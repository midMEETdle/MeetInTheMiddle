'use strict'

let dataHandler = {};

dataHandler.parseInput = function(req, res, next) {
	const googleApiKey = 'AIzaSyB9KfyHTrjZoOk7EiRzRFGqYvruh4hm6iY';
	let baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
	let urlArray = [];

	for (let key in req.body) {
		var url = baseUrl;
		for (let key2 in req.body[key]) {
			url += req.body[key][key2].replace(' ', '+');
		}
		url += '&key' + googleApiKey;
		urlArray.push(url);
	}

	req.body.inputUrlArray = urlArray;
	next(); 
};

// dataHandler.findCentralLocation = function(req, res, next) {
// };

dataHandler.addDummyData = function (req, res, next) {
	console.log('inside dummy data');
	req.body = {};
	req.body = {
		address1: {
			street: '130 Gull Street,',
			city: 'Manhattan Beach,',
			state: ' CA',
		},
		address2: {
			street: '825 7th Street,',
			city: 'Hermosa Beach,',
			state: ' CA',
		}
	}
	next();
};

module.exports = dataHandler;
