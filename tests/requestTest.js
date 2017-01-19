var request = require('request')

request.get('http://localhost:3000/coords/first/-37.8294387/144.980803/10', function(req, res) {
	console.log(res.body)
})
