'use strict'

let dataHandler = {};

dataHandler.parseInput = function (req, res, next) {
	const googleApiKey = 'AIzaSyB9KfyHTrjZoOk7EiRzRFGqYvruh4hm6iY';
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

// dataHandler.addDummyData = function (req, res, next) {
// 	console.log('inside dummy data');
// 	req.body = {};
// 	req.body.inputArray = [ 
// 		{
// 			name: 'Matt',
// 			street: '130 Gull Street,',
// 			city: 'Manhattan Beach,',
// 			state: ' CA',
// 		},
// 		{
// 			name: 'Sandra',
// 			street: '3415 McLaughlin Avenue,',
// 			city: 'Los Angeles,',
// 			state: ' CA',
// 		}
// 	];
// 		next();
// };

module.exports = dataHandler;
