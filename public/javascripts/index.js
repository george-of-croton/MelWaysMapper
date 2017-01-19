document.onload = function() {
	var lon = document.getElementById('lon')
	var lat = document.getElementById('lat')

	centreMapOnAddress(lat, lon)
}
var mappy;

function centreMapOnAddress(lat, lon, level) { //this function just follows the steps on http://www.street-directory.com.au/sd3/mapAPI/index.php
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

function grabMapAsIs() {
	console.log(mappy.getCenter())
	var bounds = mappy.getBounds()
	console.log(mappy.getBoundsZoomLevel(bounds))
}
