var request = require('request')
var fs = require('fs')

request.get({
	url: 'http://node-express-env.thnv9gnbmt.us-west-2.elasticbeanstalk.com/coords/first/-37/145/13',
}).pipe(fs.createWriteStream('./test.jpeg'))
