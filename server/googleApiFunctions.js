'use strict'

const request = require('request');

let googleApiFunctions = {};

//Get coordinates for each inputted address
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
googleApiFunctions.findCentralLocation = function(req, res, next) {
	const googleApiKey = 'AIzaSyB9KfyHTrjZoOk7EiRzRFGqYvruh4hm6iY';

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
		req.body.city = data.results[1].address_components[0].long_name;
		next();
	})
};

module.exports = googleApiFunctions;
