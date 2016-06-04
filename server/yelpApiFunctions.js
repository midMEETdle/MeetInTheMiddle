const oauthSignature = require('oauth-signature');  
const n = require('nonce')();  
const request = require('request');  
const qs = require('querystring');  

let yelpApiFunctions = {};

yelpApiFunctions.generateUrl = function(req, res, next) {
  const baseUrl = 'http://api.yelp.com/v2/search';
  const consumerKey = 'UcGPUiFVuLqi_AOLRTN64g', consumerSecret = 'xXOHH4FJASOoec9zqf4YdTVDGs0';
  const token = '-JG-i85Cv1GvEmPM7ph1CO73wuO2QB3c', tokenSecret = '1cu_V0MR0Q0pD1DIKPc3opm5RZ0';

  const defaultParameters = {
    location: 'Los+Angeles',
    sort: '2'
  };
  const setParameters = req.body.setParameters;

  let requiredParameters = {
    oauth_consumer_key : consumerKey,
    oauth_token : token,
    oauth_nonce : n(),
    oauth_timestamp : n().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0',
    oauth_signature: oauthSignature.generate('GET', url, parameters, consumerSecret, tokenSecret, { encodeSignature: false}),
  };

  req.body.requestUrl = baseUrl + '?' + qs.stringify(defaultParameters) + '?' +
                    qs.stringify(setParameters) + '?' + qs.stringify(requiredParameters);

  next();
};

yelpApiFunctions.queryLocationData = function(req, res, next) {
	request(req.body.requestUrl, function (error, response, body) {
		console.log(body);
	})
};

yelpApiFunctions.parseLocationData = function(req, res, next) {
};

module.exports = yelpApiFunctions;
