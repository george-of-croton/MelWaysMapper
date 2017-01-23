##Melways Map Generator

#A webservice I developed for my employer to automatically generate and save maps from Melways.com

The app uses the webshot API to provide functionality similar to google maps static maps, where a user can provide an address or coordinates and receive an image of the map. The app overcomes the problem of saving melways map which are provided as a series of small .png tiles, not a single image. The app had to be low maintenance and simple enough for future devs to manage easily.


## technology stack
- express.js
- jade (barely)
- Amazon elasticbeanstalk
- node.js


## Basic usage
Make sure you have node installed. You can download node here: https://nodejs.org/en/

Once you have cloned down the repository type "npm install" into your terminal to install node modules.

To boot up the server locally type the following into your terminal:
- NPM run start

In production this command is run automatically by Amazon. You can configure the app's start command in the /.ebextensions/nodecommand.config, although it is unlikely you will need to.

### Routes
Routes are kept under /routes/index.js

The only route you can expected to be called is 'coords/first/:lat/:lng/:level/:centreLat/:centreLng'.

This route begins with 'first' because it is the first route to be called by the client. This route constructs a new URL from the request parameters provided by the client.

This URL is then passed to the Webshot function within this route then calls 'coords/:lat/:lng/:level/:centreLat/:centreLng'. It is at this URL that the map is generated and appended to the DOM, and then captured by the Webshot function.

The Webshot function returns the image as a readable stream in a callback that we then pipe into the response object.

####ALTERNATIVELY:

Instead of streaming the image back to the caller you can upload the image to an Amazon s3 bucket. The code for uploading to amazon is commented out in Webshot callback. Simply uncomment (and comment out the line with stream.pipe(res) ) and enter the details of your amazon bucket (API keys are stored in the .env file and accessed using the dotenv module).

### Configuring Webshot

The Webshot documentation can be found at : https://www.npmjs.com/package/webshot

The only thing you will probably need to change is the options object, which can be passed before the callback. In the options object you can modify a number of settings, the most important perhaps being 'streamType'.

'streamType' is currently set to 'png' as it provides the best quality, but 'jpeg' improves performance.

### StreetDirectory API

The documentation for the StreeDirectory APi can be found at: http://www.street-directory.com.au/sd3/mapAPI/index.php

The code consuming the StreetDirectory API is kept at /public/javascripts/index.js.

it contains a single function, centreMapOnAddress(), which takes 5 arguments, subject latitude, subject longitude, zoom level, centrelatitude and centre longitude.

/public/javascripts/index.js is reference in /views/map.jade where the reqest parameters from the client are passed to centreMapOnAddress.

### Deployment

The is deployed on Amazon's elasticbeanstalk service.

If you wish to update the app you will need to redeploy to Amazon.

A pretty good tutorial can be found here: http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html

You will need to install the elasticbeanstalk Command Line tool which provides a git-like workflow as shown in the image below.
