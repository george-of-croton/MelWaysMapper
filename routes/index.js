var express = require('express');
var router = express.Router();
var webshot = require('webshot')
var Readable = require('stream').Readable;
var fs = require('fs')
var aws = require('aws-sdk')
var dotenv = require('dotenv').config()
var wrap = require('readable-wrap');

var url = process.env.REQUESTURLBASE
var start;


aws.config = {
	"accessKeyId": process.env.AWS_ACCESS_KEY_ID,
	"secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
	"region": "us-east-2"
}

var options = {
	quality: 50,
	phantomPath: require('phantomjs2').path,
	streamType: 'jpeg'
}


// * GET home page. */
router.get('/', function(req, res, next) {
	res.send('Follow the white rabbit');
	console.log(req.body)
});

router.get('/first/:lat/:lng/:level', function(req, res, next) {
	var params = req.params
	webshot(url + params.lat + '/' + params.lng + "/" + params.level, function(err, stream) {
		if (err) console.log(err)
		console.log("about to instantiate stream")
		stream.pipe(res)
	})
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


module.exports = router;
