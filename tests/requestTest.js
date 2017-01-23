var request = require('request')
var fs = require('fs')

request.get({
	url: 'http://node-express-env.xdccgnj5d2.ap-southeast-2.elasticbeanstalk.com/coords/first/-37.83787/144.980803/13',
}).pipe(fs.createWriteStream('./test.jpeg'))
