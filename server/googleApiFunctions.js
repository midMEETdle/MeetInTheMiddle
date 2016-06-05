'use strict'

const request = require('request');
const privateKeys = require('./../privateKeys.js');

let googleApiFunctions = {};

//Get coordinates for each inputted address
//Hard coded for two address right now: should be looped with a for all promise to handle
//indefinte amount of coordinate requests. See bluebird promises. The rest of the route
//can handle an indefinte amount of inputs
googleApiFunctions.getCoordinates = function(req, res, next) {
	let coordinateData = {
		latitudes: [],
		longitudes: [],
	};

	request(req.body.inputUrlArray[0], function (error, response, body) {
		let data = JSON.parse(body);

		coordinateData.latitudes.push(data.results[0].geometry.location.lat);
		coordinateData.longitudes.push(data.results[0].geometry.location.lng);

		request(req.body.inputUrlArray[1], function (error, response, body) {
			data = JSON.parse(body);
			coordinateData.latitudes.push(data.results[0].geometry.location.lat);
			coordinateData.longitudes.push(data.results[0].geometry.location.lng);
			req.body.coordinateData = coordinateData;
			next();
		})
	})
};

//Implementing averaging of coordinates and finding the location of the center
//Central location is sent back to the google api to get the neighborhood, which
//is needed for the yelp api query
googleApiFunctions.findCentralLocation = function(req, res, next) {
	const googleApiKey = privateKeys.googleApiKey;

	const elements = req.body.coordinateData.latitudes.length;
	const latitudeAverage = req.body.coordinateData.latitudes.reduce(function (a, b) {
		return a + b;
	}) / elements;
	const longitudeAverage = req.body.coordinateData.longitudes.reduce(function (a, b) {
		return a + b;
	}) / elements;

	req.body.averageLocation = [latitudeAverage, longitudeAverage];

	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.averageLocation[0]},${req.body.averageLocation[1]}&key=${googleApiKey}`;
	request(url, function (error, response, body) {
		let data = JSON.parse(body);
    for (var i = 0; i < data.results[1].address_components.length; i++) {
			if (data.results[1].address_components[i].types.indexOf('neighborhood') !== -1) {
				req.body.city = data.results[1].address_components[i].long_name;
				continue;
			}
		}
		next();
	})
};

module.exports = googleApiFunctions;
