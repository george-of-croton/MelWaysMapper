var request = require('request')

request.get('http://localhost:3000/coords/first/-37.829887/144.980803/9', function(req, res) {
	console.log(res.body)
})
