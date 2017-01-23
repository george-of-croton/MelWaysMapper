var request = require('request')
var fs = require('fs')


request.get({
	url: 'http://localhost:3000/coords/first/-39.830787/144.980803/13',
	encoding: 'binary'
}).pipe(fs.createWriteStream('./test.png'))
