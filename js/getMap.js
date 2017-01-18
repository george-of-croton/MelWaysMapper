import buildURL from "buildUrl"
import centerMapOnAddress from "centerMapOnAddress"

function getMap() {
	request(buildURL(), function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var newbody = JSON.parse(body)
			var coords = (newbody.results[0].geometry.location)
			centreMapOnAddress(coords.lat, coords.lng)
		};
	});
};

module.exports = getMap
