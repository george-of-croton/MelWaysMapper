var request = require('request')

request.get('http://localhost:3000/coords/first/-37.829787/144.980803/13', function(req, res) {
	console.log(res.body)
})
