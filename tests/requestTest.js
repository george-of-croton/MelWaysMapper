var request = require('request')

request.get('https://mysterious-taiga-89115.herokuapp.com/coords/first/-37.829887/144.980803/13', function(req, res) {
	console.log(res.body)
})
