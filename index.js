//Import modules
var AWS = require('aws-sdk');
var util = require('util');
var dbox = require("dbox");
var fs = require('fs');

//Load Setting
var setting = JSON.parse(fs.readFileSync('setting.json'));
var consumer_key = setting.consumer_key;
var consumer_secret = setting.consumer_secret;
var app = dbox.app({ "app_key": consumer_key, "app_secret": consumer_secret})

//Load dropbox's access token
var token = JSON.parse(fs.readFileSync('token.json'));
var client = app.client(token);

//Create S3 client 
var s3 = new AWS.S3();

//Create event handler for S3
exports.handler = function(event, context) {
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));

        var srcBucket = event.Records[0].s3.bucket.name;
        var srcKey = event.Records[0].s3.object.key;

        console.log("The file which you updated is " + srcKey);

        //Download file from S3, and save it to buffer.

        s3.getObject({
            Bucket: srcBucket,
            Key: srcKey
        },toDropbox);

        function toDropbox(err,file){

            if(err){
                console.log(err);
                return;
            }

            //You can change it to your own app's folder.

            var path = "/s3Backuper/" + srcKey;

            //Upload the file to 

            client.put(path,file.Body,upload);
        } 

        function upload(status,reply){

            console.log(reply);
        }
}

