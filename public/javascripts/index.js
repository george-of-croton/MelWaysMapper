var centreMapOnAddress = function(lat, lon, level, centreLat, centreLng) { //this function just follows the steps on http://www.street-directory.com.au/sd3/mapAPI/index.php
	var myMap = new JMap(document.getElementById("map-canvas"));
	var myLonLat = new JLonLat(centreLng, centreLat);
	// var myLonLat = new JLonLat(centreLng, centreLat);
	var point = new JLonLat(lon - 0.00049, lat + 0.0002);
	var icon = new JIcon(J_DEFAULT_ICON);
	icon.iconSize = {
		w: 120,
		h: 70
	}
	icon.image = 'https://s3-ap-southeast-2.amazonaws.com/elasticbeanstalk-ap-southeast-2-281842912445/icon.png'
	var markerOptions = {
		icon: icon,
		draggable: false
	};
	var marker = new JMarker(point, markerOptions);
	lv = 14


	myMap.setCenter(myLonLat, lv, J_AUSWAY_MAP);
	myMap.addOverlay(marker);
};
