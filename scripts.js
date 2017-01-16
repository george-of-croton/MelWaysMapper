var request = require('request');
var APIkey = "&key=AIzaSyD3xpq_3z5c0wWWPHeOckZ3AKzylC5anOQ"
var requestURL = "https://maps.googleapis.com/maps/api/geocode/json?address="

var clickbutton = document.getElementById("buildbutton").onclick=getMap;

function getMap(){
  request(buildURL(), function(error, response, body){ //request function takes a URL and a callback as parameters
    if(!error && response.statusCode == 200) {
      var newbody = JSON.parse(body)
      var coords = (newbody.results[0].geometry.location)
      centreMapOnAddress(coords.lat, coords.lng)
    };
  });
};

function buildURL() { //This function returns a URL for the request and is probably irrelevant to how you will implement
  var street = document.getElementById("street").value.split(" ");
  var newrequestUrl = requestURL;
  street.forEach(function(x) {
    if(x == street[0]) {
    newrequestUrl = newrequestUrl + x;
    }
    else newrequestUrl = newrequestUrl + "+" + x;
  })
  newrequestUrl = newrequestUrl + APIkey;
  return(newrequestUrl)
}

function centreMapOnAddress(lat, lon){ //takes lat and long in
  var myMap = new JMap(document.getElementById("map-canvas"));
  var myLonLat = new JLonLat(lon,lat);
  var point = new JLonLat(lon,lat);
  var icon = new JIcon(J_DEFAULT_ICON);
  icon.iconSize = {w: 50, h:50}
  icon.image = './images/arrow.png'
  var markerOptions = {icon:icon, draggable:false};
  var marker = new JMarker(point,markerOptions);
  var lv = 13;
  myMap.setCenter(myLonLat,lv,J_AUSWAY_MAP);
  myMap.addOverlay(marker);
  console.log(myMap.getMapTypes());
}

var map = document.getElementById("map-canvas")
