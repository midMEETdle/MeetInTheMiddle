'use strict'

const oauthSignature = require('oauth-signature');
const n = require('nonce')();
const request = require('request');
const qs = require('querystring');
const privateKeys = require('./../privateKeys');

let yelpApiFunctions = {};

//function gnerates oauthsignature and query string for yelp api
//hard coded to restaurants right now
yelpApiFunctions.generateUrl = function(req, res, next) {
  const baseUrl = 'http://api.yelp.com/v2/search';
  const consumerKey = privateKeys.consumerKey, consumerSecret = privateKeys.consumerSecret;
  const token = privateKeys.token, tokenSecret = privateKeys.tokenSecret;

  let parameters = {
    location: req.body.city,
    cll: req.body.averageLocation[0] + ',' + req.body.averageLocation[1],
    //For sort: 0 is best match (default), 1 is distance, 2 is higest rated
    sort: '0',
    category_filter: 'restaurants',
  };
  //console.log(parameters);

  parameters.oauth_consumer_key = consumerKey;
  parameters.oauth_token = token;
  parameters.oauth_nonce = n();
  parameters.oauth_timestamp = n().toString().substr(0,10);
  parameters.oauth_signature_method = 'HMAC-SHA1';
  parameters.oauth_version = '1.0';
  parameters.oauth_signature = oauthSignature.generate('GET', baseUrl, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

  req.body.requestUrl = baseUrl + '?' + qs.stringify(parameters);

  next();
};

//queries yelp api for location data and slices 10 results
yelpApiFunctions.queryLocationData = function(req, res, next) {
  request(req.body.requestUrl, function (error, response, body) {
    const data = JSON.parse(body);
    const RESULTS = 10;
    req.body.businessArray = data.businesses.slice(0, RESULTS);
    console.log(req.body.businessArray);
    next();
  })
};

module.exports = yelpApiFunctions;
