var request = require('request')
var dotenv = require('dotenv')

function grabMapAsIs(lat, lon) {
	var mapState = {
		coords: {
			lat: lat,
			lng: lon,
		},
		centre: mappy.getCenter(),
		zoom: mappy.getBoundsZoomLevel(mappy.getBounds())
	}

	request.get(url, function(req, res, next) {
		console.log(res.body, "response body")
		console.log(typeof(res.body))
		var img = document.createElement("img")
		img.src = res.body
		document.body.appendChild(img)
	})

	var url = function() {
		return process.env.REQUESTURLBASE + "/" + lat + '/' + lon + '/' + mapState.zoom + "/" + mapState.centre.lat + "/" + mapState.centre.lon
	}

}
