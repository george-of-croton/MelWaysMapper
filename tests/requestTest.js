var request = require('request')

request.get('http://localhost:3000/coords/first/343254324325/fdsfdsf', function(req, res) {
	console.log(res)
})
