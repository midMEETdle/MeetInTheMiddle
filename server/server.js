'use strict'

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const oauthSignature = require('oauth-signature');  
const n = require('nonce')();
const qs = require('querystring');
const dataHandler = require('./dataHandler');
const googleApiFunctions = require('./googleApiFunctions');
const yelpApiFunctions = require('./yelpApiFunctions');

let app = express();

// app.use(express.static(__dirname + './../client/')); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(dataHandler.addDummyData, dataHandler.parseInput, googleApiFunctions.getCoordinates,
		googleApiFunctions.findCentralLocation, yelpApiFunctions.generateUrl, yelpApiFunctions.queryLocationData);

app.get('/', function (req, res) {
	console.log('hello world');
	res.send('hello, client!');
});

app.listen(3000);

module.exports = app;
