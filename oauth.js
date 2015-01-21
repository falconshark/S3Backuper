var google = require('googleapis');
var OAuth2Client = google.auth.Oauth2;

var readline = require('readline-sync');
var fs = require('fs');

var tokenFile = fs.readFileSync('setting.json');

var token = JSON.parse(tokenFile);

var CLIENT_ID = token.client_id;
var CLIENT_SECRET = token.client_secret;
var REDIRECT_URL = 'YOUR REDIRECT URL HERE';

function getAccessToken(oauth2Client,token){

}


