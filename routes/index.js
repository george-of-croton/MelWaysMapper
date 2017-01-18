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



{
	"Id": "Policy1484778836124",
	"Version": "2012-10-17",
	"Statement": [{
			"Sid": "Stmt1484778583783",
			"Action": [
				"s3:GetObject"
			],
			"Effect": "Allow",
			"Resource": "arn:aws:s3:::elasticbeanstalk-us-west-1-281842912445",
			"Principal": "*"
		},
		{
			"Sid": "eb-ad78f54a-f239-4c90-adda-49e5f56cb51e",
			"Effect": "Allow",
			"Principal": {
				"AWS": "arn:aws:iam::281842912445:role/aws-elasticbeanstalk-ec2-role"
			},
			"Action": "s3:PutObject",
			"Resource": "arn:aws:s3:::elasticbeanstalk-us-west-1-281842912445/resources/environments/logs/*"
		},
		{
			"Sid": "eb-af163bf3-d27b-4712-b795-d1e33e331ca4",
			"Effect": "Allow",
			"Principal": {
				"AWS": "arn:aws:iam::281842912445:role/aws-elasticbeanstalk-ec2-role"
			},
			"Action": [
				"s3:ListBucket",
				"s3:ListBucketVersions",
				"s3:GetObject",
				"s3:GetObjectVersion"
			],
			"Resource": [
				"arn:aws:s3:::elasticbeanstalk-us-west-1-281842912445",
				"arn:aws:s3:::elasticbeanstalk-us-west-1-281842912445/resources/environments/*"
			]
		},
		{
			"Sid": "eb-58950a8c-feb6-11e2-89e0-0800277d041b",
			"Effect": "Deny",
			"Principal": {
				"AWS": "*"
			},
			"Action": "s3:DeleteBucket",
			"Resource": "arn:aws:s3:::elasticbeanstalk-us-west-1-281842912445"
		}
	]
}

{
	"Version": "2008-10-17",
	"Statement": [,
		{
			"Sid": "Stmt1484778583783",
			"Action": [
				"s3:GetObject"
			],
			"Effect": "Allow",
			"Resource": "arn:aws:s3:::elasticbeanstalk-us-west-1-281842912445",
			"Principal": {
				"AWS": "*"
			}
		}
	]
}
