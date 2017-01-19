var express = require('express');
var router = express.Router();
var webshot = require('webshot')
var Readable = require('stream').Readable;
var aws = require('aws-sdk')
var dotenv = require('dotenv').config()
var url = process.env.REQUESTURLBASE


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
// url + req.params.lat + '/' + req.params.lng
router.get('/first/:lat/:lng/:level', function(req, res, next) {
	var start = Date.now()
	console.log("hello")
	webshot(url + req.params.lat + '/' + req.params.lng + "/" + req.params.level, function(err, stream) {
		if (err) console.log(err)
		console.log("about to instantiate stream")
		var s3 = new aws.S3({
			params: {
				Bucket: 'elasticbeanstalk-us-west-1-281842912445',
				Key: req.params.lat + '.png'
			}
		})

		var readableStream = new Readable().wrap(stream);

		s3.upload({
			Body: readableStream
		}, function(err, data) {
			if (err) return console.log(err);
			var end = Date.now()
			var elapsed = end - start;
			console.log("time elapsed = " + elapsed / 1000 + "seconds")
			res.send(data["Location"])
		})
		console.log("weehee!")
	})
})

router.get('/:lat/:lng/:level', function(req, res, next) {
	var coords = req.params
	res.render('map', coords)
})

module.exports = router;
