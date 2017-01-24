var express = require('express');
var router = express.Router();
var webshot = require('webshot')
var Readable = require('stream').Readable;
var fs = require('fs')
var aws = require('aws-sdk')
var dotenv = require('dotenv').config()

var url = process.env.REQUESTURLBASE

// * GET home page. */
router.get('/', function(req, res, next) {
	res.send('Follow the white rabbit');
	console.log(req.body)
});

router.get('/first/:lat/:lng/:level/:centreLat/:centreLng', function(req, res, next) {
	start = Date.now()
	var params = req.params
	webshot(url + params.lat + '/' + params.lng + "/" + params.level + "/" + params.centreLat + "/" + params.centreLng, {
			streamType: 'png'
		},
		function(err, stream) {
			if (err) console.log(err)
			stream.pipe(res)
			// var readableStream = new Readable().wrap(stream)
			// var s3 = new aws.S3({
			// 	params: {
			// 		Bucket: 'illegalsanchino',
			// 		Key: params.lat + '.png'
			// 	}
			// })
			//
			// s3.upload({
			// 	Body: readableStream
			// }, function(err, data) {
			// 	if (err) return console.log(err);
			// 	var end = Date.now()
			// 	var elapsed = end - start;
			// 	console.log("time elapsed = " + elapsed / 1000 + "seconds")
			// 	res.send(data["Location"])
			// })
		})
})

router.get('/:lat/:lng/:level/:centreLat/:centreLng', function(req, res, next) {
	var coords = req.params
	res.render('map', coords)
})

module.exports = router;
