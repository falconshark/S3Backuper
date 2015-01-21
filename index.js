//Import modules
var AWS = require('aws-sdk');
var util = require('util');
var fs = require('fs');

//Load setting file

var setting = JSON.parse(fs.readFileSync('setting.json'));
var consumer_key = setting.consumer_key;
var consumer_secret = setting.consumer_secret;

//Create S3 client

var s3 = new AWS.S3();

//Create event handler for S3
exports.handler = function(event, context) {
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
    
    for (i = 0; i < event.Records.length; i++){

        var srcBucket = event.Records[i].s3.bucket.name;
        var srcKey = event.Records[i].s3.object.key;

        console.log("The file which you updated is " + srcKey);

        //Download file from S3

        s3.getObject({
            Bucket: srcBucket,
            Key: srcKey
        },upload);

        function upload(err,file){

            if(err){
                console.log(err);
                return;
            }

            var dropbox = new DropboxClient(consumer_key, consumer_secret);

            dropbox.getAccessToken(dropbox_email, dropbox_password, callback);

            console.log(file);

            context.done();
        } 
    }
}

