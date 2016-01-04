$(document).ready(function(){
	var isMobile = {
		Android: function() { 
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	if (!isMobile.any()){
		$('[data-toggle="tooltip"]').tooltip();   
	}

	$('#user_password').on('blur', function () {
		$('#listOfErrors').fadeOut('slow');
	});

	$('#user_password').on('focus', function () {
		$('#listOfErrors').fadeIn('slow');
	});

	$('#event_startDate').datepicker({
		dateFormat: 'dd-M-yy',
		showOtherMonths: true,
		onSelect: function () {
			var currentDate = $('#event_startDate').datepicker('getDate');
			$('#event_endtDate').datepicker('option', 'minDate', new Date(currentDate));
		}
	});

	$('#event_endtDate').datepicker({
		dateFormat: 'dd-M-yy',
		showOtherMonths: true
	});
	
});