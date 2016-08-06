import { Router } from "express";

let n = require('nonce')();
let request = require('request');
let _ = require('lodash');
let qs = require('querystring');
let oauthSignature = require('oauth-signature');

const yelp: Router = Router();

yelp.post("/", function(req, res) {

    let lat = req.body.lat;
    let lng = req.body.lng;

    console.log(lat);
    console.log(lng);

    var url = "https://api.yelp.com/v2/search";


    var httpMethod = 'GET';

    var default_parameters = {
        term: 'food',
        ll: lat+","+lng,
        sort: '1'
    };

    var required_parameters = {
        oauth_consumer_key : "oauth consumer key goes here",
        oauth_token : "oauth token goes here",
        oauth_nonce : n(),
        oauth_timestamp : n().toString().substr(0,10),
        oauth_signature_method : 'HMAC-SHA1',
        oauth_version : '1.0'
    };

    var parameters = _.assign(default_parameters, required_parameters);

    var consumerSecret = "consumer secret goes here";
    var tokenSecret = "token secret goes here";

    var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

    parameters.oauth_signature = signature;

    var paramURL = qs.stringify(parameters);

    console.log(paramURL);


    var apiURL = url+'?'+paramURL;

    request(apiURL, function(error, response, body){
        if(error){
            console.log(error);
        };

        if(response){
            res.send(response);
        };
    });

});

export {yelp}





