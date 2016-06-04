
let dataHandler = {};

dataHandler.parseInput = function(req, res, next) {
	const googleApiKey = 'AIzaSyB9KfyHTrjZoOk7EiRzRFGqYvruh4hm6iY';
	let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

	for (let key in req.body) {
		for (let key2 in req.body[key]) {
			url += req.body[key][key2].replace(' ', '+');
		}
	}
	url += '&key' + googleApiKey;

	req.body.inputUrl = url;
	next(); 
};

dataHandler.findCentralLocation = function(req, res, next) {
};

dataHandler.addDummyData = function (req, res, next) {
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
}

module.exports = dataHandler;
