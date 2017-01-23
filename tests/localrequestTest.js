var request = require('request')
var fs = require('fs')


// request.get({
// 	url: 'http://localhost:3000/coords/first/-37.83787/144.980803/13',
// }).pipe(fs.createWriteStream('./test.jpeg'))


request.get('http://localhost:3000/coords/first/-37.83787/144.980803/13', function(err, response, body) {
	var readableStream = fs.createReadStream(body);
	readableStream.setEncoding('binary');
	var data = '';

	readableStream.on('data', function(chunk) {
		data += chunk;
	});

	readableStream.on('end', function() {
		console.log(data);
	});
})
