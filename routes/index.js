var express = require('express');
var router = express.Router();
var webshot = require('webshot')
var Readable = require('stream').Readable;
var aws = require('aws-sdk')
var url = 'https://mysterious-taiga-89115.herokuapp.com/coords/'
var dotenv = require('dotenv').config()

aws.config = {
	"accessKeyId": process.env.AWS_ACCESS_KEY_ID,
	"secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
	"region": "us-west-1"
}


// * GET home page. */
router.get('/', function(req, res, next) {
	res.send('Follow the white rabbit');
	console.log(req.body)
});

router.get('/first/:lat/:lng', function(req, res, next) {
	console.log("hello")
	webshot(url + req.params.lat + '/' + req.params.lng, function(err, stream) {
		if (err) console.log(err)

		var s3 = new aws.S3({
			params: {
				Bucket: 'elasticbeanstalk-us-west-1-281842912445',
				Key: 'google.png'
			}
		})

		var readableStream = new Readable().wrap(stream);

		s3.upload({
			Body: readableStream
		}, function(err, data) {
			if (err) return console.log(err);

			res.send(data["Location"])
		})
		console.log("weehee!")
	})
})

router.get('/:lat/:lng', function(req, res, next) {
	var coords = req.params
	res.render('map', coords)
})

module.exports = router;
