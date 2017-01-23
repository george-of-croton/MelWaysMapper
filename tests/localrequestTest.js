var request = require('request')
var fs = require('fs')


request.get({
	url: 'http://localhost:3000/coords/first/-37.83787/144.980803/13',
}).pipe(fs.createWriteStream('./test.jpeg'))
