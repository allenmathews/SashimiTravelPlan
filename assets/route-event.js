var addresses = JSON.parse(localStorage.getItem('sashimiTravelPlanAddresses'));

var startAddress = addresses.startAddress;
var finishAddress = addresses.finishAddress;

var departFrom = '&from=' + startAddress;
var arriveAt = '&to=' + finishAddress;
var advancedParameters = '&outFormat=json&ambiguities=ignore&unit=k&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false';
var mapKey = 'key=' + 'JNvtu9NOZsJD8HsaHnkEM7GEph5G4T2L';
var resourceUrl = 'http://open.mapquestapi.com/directions/v2/route?';

// insert div id of container where route will be displayed
var printHere = $('#route');

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
	console.log(response);
	//code to loop through all directions in response and insert narritve,distance and time
	for (var i = 0; i < response.route.legs[0].maneuvers.length; i++) {
		var narrative = String(i + 1) + '. ' + response.route.legs[0].maneuvers[i].narrative;
		var distance = response.route.legs[0].maneuvers[i].distance;
		var time = response.route.legs[0].maneuvers[i].formattedTime;

		var direction = $('<div>')
			.attr('id', 'dir' + String(i))
			.addClass('travel-plan'); // @James/@Priya Amend added class name [travel-plan] for directions styling
		var n = $('<h1>').text(narrative);
		var d = $('<p>').text(distance + ' kilometers');
		var t = $('<p>').text(time);

		direction.append(n, d, t);
		printHere.append(direction);
	}
}
function queryString(originalString) {
	console.log(originalString);
	return originalString.replace(new RegExp(' ', 'g'), '+');
}
init();
