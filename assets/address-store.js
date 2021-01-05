// Parent HTML file: index.html

function init() {
	$('#search').on('click', (event) => searchEvent(event));
}

function searchEvent(event) {
	event.preventDefault();
	validateUserInput();
}

function validateUserInput() {
	var currentLocation = $('#currentLocation').val();
	var destination = $('#destination').val();
	console.log(currentLocation.length * destination.length);
	if (isNaN(currentLocation.length * destination.length) || currentLocation.length * destination.length === 0) {
		showError();
	} else {
		var Addresses = {
			startAddress: currentLocation,
			finishAddress: destination,
		};
		localStorage.setItem('sashimiTravelPlanAddresses', JSON.stringify(Addresses));
		location.href = './wireframe-2.html'; // AMEND WIREFRAME PAGE 2 GOES HERE
	}
}

function showError() {
	var errorModal = $('<div>').addClass('travel-plan'); // @James/@Priya Amend added class name [travel-plan] to appropriate styling for modal (popup)
	errorModal.attr('id', 'errorModal');
	var h = $('<h1>').text('Error');
	var p = $('<p>').text('Please Insert Valid Addresses');
	var b = $('<br>').attr('id', 'modalBreak');
	var closeBtn = $('<button>').addClass('close-button').text('close').attr('id', 'closeModal');
	errorModal.append(h, p, closeBtn);

	$('#searchContent').prepend(errorModal, b);
	$('#searchForm').trigger('reset');

	$('#closeModal').on('click', () => killModal());
}

function killModal() {
	$('#errorModal').remove();
	$('#modalBreak').remove();
}

init();
