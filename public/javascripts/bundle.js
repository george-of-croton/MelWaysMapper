(function e(t, n, r) {
	function s(o, u) {
		if (!n[o]) {
			if (!t[o]) {
				var a = typeof require == "function" && require;
				if (!u && a) return a(o, !0);
				if (i) return i(o, !0);
				var f = new Error("Cannot find module '" + o + "'");
				throw f.code = "MODULE_NOT_FOUND", f
			}
			var l = n[o] = {
				exports: {}
			};
			t[o][0].call(l.exports, function(e) {
				var n = t[o][1][e];
				return s(n ? n : e)
			}, l, l.exports, e, t, n, r)
		}
		return n[o].exports
	}
	var i = typeof require == "function" && require;
	for (var o = 0; o < r.length; o++) s(r[o]);
	return s
})({
	1: [function(require, module, exports) {
		// var request = require('request')
		// var dotenv = require('dotenv')
		document.onload = function() {
			var lon = document.getElementById('lon')
			var lat = document.getElementById('lat')

		}
		var mappy;

		var centreMapOnAddress = function(lat, lon, level) { //this function just follows the steps on http://www.street-directory.com.au/sd3/mapAPI/index.php
			var myMap = new JMap(document.getElementById("map-canvas"));
			var myLonLat = new JLonLat(lon, lat - .0010);
			var point = new JLonLat(lon, lat);
			var icon = new JIcon(J_DEFAULT_ICON);
			icon.iconSize = {
				w: 50,
				h: 50
			}
			var markerOptions = {
				icon: icon,
				draggable: false
			};
			var marker = new JMarker(point, markerOptions);
			var lv;
			if (level != '') {
				lv = level;
			} else {
				lv = 13
			}

			myMap.setCenter(myLonLat, lv, J_AUSWAY_MAP);
			myMap.addOverlay(marker);
			mappy = myMap
		}

		function grabMapAsIs(lat, lon) {
			var mapState = {
				coords: {
					lat: lat,
					lng: lon,
				},
				centre: mappy.getCenter(),
				zoom: mappy.getBoundsZoomLevel(mappy.getBounds())
			}
		}


		// 	request.get(url, function(req, res, next) {
		// 		console.log(res.body, "response body")
		// 		console.log(typeof(res.body))
		// 		var img = document.createElement("img")
		// 		img.src = res.body
		// 		document.body.appendChild(img)
		// 	})
		//
		// 	var url = function() {
		// 		return process.env.REQUESTURLBASE + "/" + lat + '/' + lon + '/' + mapState.zoom + "/" + mapState.centre.lat + "/" + mapState.centre.lon
		// 	}
		//
		// }

		//
		// }

	}, {}]
}, {}, [1]);
