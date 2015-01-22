//Import modules
var dbox = require("dbox");
var fs = require('fs');
var readline = require('readline-sync');

//Load Setting
var setting = JSON.parse(fs.readFileSync('setting.json'));
var consumer_key = setting.consumer_key;
var consumer_secret = setting.consumer_secret;

//Create Dropbox app
var app  = dbox.app({ "app_key": consumer_key, "app_secret": consumer_secret});

fs.exists('token.json',checkToken);

function checkToken(result){

	if (result == true){

		console.log('Your access token is already exist! You do not need to run it now.');

		return;
	}

	app.requesttoken(getRequestToken);

}


function getRequestToken(status, request_token){

	console.log('You must visit the url to grant authorization to account first.');

	console.log(request_token.authorize_url);

	readline.question('If you are done it, press enter.');

	app.accesstoken(request_token,getAccessToken);
}

function getAccessToken(status, access_token){

	if (status == 401){

		console.log('You must visit the url to grant authorization to account first.');

		return;
	}

	var token = JSON.stringify(access_token);

	fs.writeFileSync('token.json',token);

	console.log('Your access token is saved to token.json.');
}


