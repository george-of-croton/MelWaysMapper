var express = require('express');
var router = express.Router();
var webshot = require('webshot')
var Readable = require('stream').Readable;
var aws = require('aws-sdk')
var dotenv = require('dotenv').config()
var url = process.env.REQUESTURLBASE
var start;


aws.config = {
	"accessKeyId": process.env.AWS_ACCESS_KEY_ID,
	"secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
	"region": "ap-southeast-2"
}


// * GET home page. */
router.get('/', function(req, res, next) {
	res.send('Follow the white rabbit');
	console.log(req.body)
});
// url + req.params.lat + '/' + req.params.lng
router.get('/first/:lat/:lng/:level', function(req, res, next) {
	start = Date.now()
	console.log("hello")
	saveMapToCloud(req.params, res)
})

router.get('/:lat/:lng/:level', function(req, res, next) {
	var coords = req.params
	res.render('map', coords)
})

router.get('/:interface/:lat/:lng/:level', function(req, res, next) {
	var coords = req.params
	console.log(req.params.interface)
	res.render('mapinterface', coords)
})

router.get('/:interface/:lat/:lng/:level/:centrelat/:centrelng', function(req, res, next) {
	var coords = req.params
	console.log(req.params.interface)
	res.render('mapinterface', coords)
})

function saveMapToCloud(params, response) {

	webshot(url + params.lat + '/' + params.lng + "/" + params.level, function(err, stream) {
		if (err) console.log(err)
		console.log("about to instantiate stream")
		var s3 = new aws.S3({
			params: {
				Bucket: 'badandbougie',
				Key: params.lat + '.png'
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
			response.send(data["Location"])
		})
		console.log("weehee!")
	})
}

module.exports = router;
