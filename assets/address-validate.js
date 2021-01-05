var addresses = JSON.parse(localStorage.getItem('sashimiTravelPlanAddresses'));

var startAddress = addresses.startAddress;
var finishAddress = addresses.finishAddress;

var departFrom = '&from=' + startAddress;
var arriveAt = '&to=' + finishAddress;
var advancedParameters = '&outFormat=json&ambiguities=ignore&unit=k&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false';
var mapKey = 'key=' + 'JNvtu9NOZsJD8HsaHnkEM7GEph5G4T2L';
var resourceUrl = 'http://open.mapquestapi.com/directions/v2/route?';

function init() {
	departFrom = queryString(departFrom);
	arriveAt = queryString(arriveAt);
	var queryURL = resourceUrl + mapKey + departFrom + arriveAt + advancedParameters;
	console.log(queryURL);
	$.ajax({
		url: queryURL,
		method: 'GET',
	}).then((response) => validateAddresses(response));
}

function validateAddresses(response) {
	$('#loader').hide();
	console.log(response);
	if (response.info.statuscode !== 0) {
		showInvalidAddress();
	} else {
		showConfirmAddress(response);
	}
}

function queryString(originalString) {
	console.log(originalString);
	return originalString.replace(new RegExp(' ', 'g'), '+');
}

function showInvalidAddress() {
	var invalidEle = $('<div>').addClass('invalidAddress'); // @James/@Priya Amend added class name [travel-plan] to appropriate styling for showInvalidAddress (Wireframe page 2)
	invalidEle.attr('id', 'errorModal');
	var h = $('<h1>').text('Error');
	var p = $('<p>').text('Please Insert Valid Addresses');
	var b = $('<br>').attr('id', 'modalBreak');
	var returnBtn = $('<button>').addClass('close-button').text('Return to Search Address').attr('id', 'return');
	invalidEle.append(h, p, returnBtn);

	$('body').append(invalidEle, b);

	$('#return').on('click', function () {
		location.href = './index.html';
	});
}

function showConfirmAddress(response) {
	var AddressCheck = $('<div>').attr('id', 'userAddresses');
	for (var i = 0; i < response.route.locations.length; i++) {
		console.log(i);
		var addressType = i === 0 ? 'Departing From' : 'Destination';
		var Street = response.route.locations[i].street;
		var Postcode = response.route.locations[i].postalCode;
		var State = response.route.locations[i].adminArea3;
		var Country = response.route.locations[i].adminArea1;

		var d = $('<div>');
		var t = $('<h1>').text(addressType + ':');
		var checkStreet = $('<h2>').text('Street:');
		var pStreet = $('<p>').text(Street);
		var checkPostcode = $('<h2>').text('Postcode:');
		var pPostcode = $('<p>').text(Postcode);
		var checkState = $('<h2>').text('State:');
		var pState = $('<p>').text(State);
		var checkCountry = $('<h2>').text('Country:');
		var pCountry = $('<p>').text(Country);

		d.append(t, checkStreet, pStreet, checkPostcode, pPostcode, checkState, pState, checkCountry, pCountry);
		AddressCheck.append(d);
	}
	var confirmBtn = $('<button>').addClass('close-button').text('Confirm').attr('id', 'confirm');
	var returnBtn = $('<button>').addClass('close-button').text('return').attr('id', 'return');

	AddressCheck.append(confirmBtn, returnBtn);

	$('#addressValidation').append(AddressCheck);

	$('#confirm').on('click', function () {
		location.href = './wireframe-3.html';
	});
	$('#return').on('click', function () {
		location.href = './index.html';
	});
}

init();
