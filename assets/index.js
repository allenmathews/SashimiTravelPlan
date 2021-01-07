var mapKey = 'key=' + 'JNvtu9NOZsJD8HsaHnkEM7GEph5G4T2L';
var resourceUrl = 'http://open.mapquestapi.com/directions/v2/route?';

//TO-DO:
// 1. Insert code to to get input addresses from local storage here
// 2. Insert code to put directions information into formatted HTML containers here
// 3. Insert code to validate address here

var departFrom = '&from=' + '11 Cranwell Street Craigieburn Victoria Australia';
var arriveAt = '&to=' + '95 Miller Street Fitzroy North Victoria Australia';
var advancedParameters = '&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false';

// insert div id of container where route will be displayed
// var printHere = $('#route');

function init() {
	departFrom = queryString(departFrom);
	arriveAt = queryString(arriveAt);
	var queryURL = resourceUrl + mapKey + departFrom + arriveAt + advancedParameters;
	$.ajax({
		url: queryURL,
		method: 'GET',
	}).then((response) => displayRoute(response));
}
function displayRoute(response) {
	//code to loop through all directions in response and insert narritve,distance and time
	for (var i = 0; i < response.route.legs[0].maneuvers.length; i++) {
		var narrative = response.route.legs[0].maneuvers[i].narrative;
		var distance = response.route.legs[0].maneuvers[i].distance;
		var time = response.route.legs[0].maneuvers[i].formattedTime;
	}
}
function validateAddresss(address) {
	//code to validate user address
}
function queryString(originalString) {
	console.log(originalString);
	return originalString.replace(new RegExp(' ', 'g'), '+');
}
init();

