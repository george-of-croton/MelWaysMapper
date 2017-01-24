var request = require('request')
var fs = require('fs')
var url = 'http://node-express-env.xdccgnj5d2.ap-southeast-2.elasticbeanstalk.com/coords/first/-37.83787/144.980803/13/-37.83787/144.980803'
var test = require('tape')


test('file test',
	function(t) {
		t.plan(2)
		t.equal(typeof url, "string")
		fs.readFile('./tests/test.png', function read(err, data) {
			if (err) {
				console.log(err);
			}
			console.log(data)
			t.equal(typeof data, "object")
		})
	})
