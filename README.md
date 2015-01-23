# S3Backuper
An example of using AWS Lambda, which can auto backup S3 file to dropbox.

###Installation
*Note: Before install it, you should install node.js at you computer first. http://nodejs.org/download/*

1. Clone this git repository:

    `$ git clone https://github.com/dollars0427/S3Backuper.git`
    
2. Go into the folder and install dependencies:

    `$ cd ./S3Backuper`

    `$ npm install`
    
3. Copy and edit the setting file.You must change the consumer_key and consumer_secret to your own:

    `$ cp setting.json.example setting.json`

    `$ vi setting.json`
    
    `{"consumer_key":"Your consumer key","consumer_secret":"your consumer_secret"}`
    
4. Run dropboxOauth.js to get the access token form dropbox:

    `$ node dropboxOauth.js`
    
    It will show a authorize_url to you, then you must visit the url to grant authorization to account.
    After that, you will get a file which call 'token.json'.

5. Zip it.

    `$ zip s3Backuper.zip *`
    
6. Create a AWS Lambda function and upload the zip file.To know how to use the AWS Lambda, go to this link:

    http://docs.aws.amazon.com/lambda/latest/dg/getting-started-custom-events.html


