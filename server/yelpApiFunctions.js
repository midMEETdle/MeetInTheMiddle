'use strict'

const oauthSignature = require('oauth-signature');  
const n = require('nonce')();  
const request = require('request');  
const qs = require('querystring');  

let yelpApiFunctions = {};

yelpApiFunctions.generateUrl = function(req, res, next) {
  const baseUrl = 'http://api.yelp.com/v2/search';
  const consumerKey = 'UcGPUiFVuLqi_AOLRTN64g', consumerSecret = 'xXOHH4FJASOoec9zqf4YdTVDGs0';
  const token = '-JG-i85Cv1GvEmPM7ph1CO73wuO2QB3c', tokenSecret = '1cu_V0MR0Q0pD1DIKPc3opm5RZ0';
  
  console.log('city is ' + req.body.city);
  
  let parameters = {
    location: req.body.city,
    cll: req.body.centralCoordinates.lat + ',' + req.body.centralCoordinates.lng,
    sort: '2'
  };

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

yelpApiFunctions.queryLocationData = function(req, res, next) {
  request(req.body.requestUrl, function (error, response, body) {
    console.log(body);
    res.send(body);
    next();
  })
};

yelpApiFunctions.parseLocationData = function(req, res, next) {
};

module.exports = yelpApiFunctions;
