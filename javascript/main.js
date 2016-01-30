function checkTooltip () {
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
	}else{
		$('.glyphicon-info-sign').hide();
	}
}

function passwordToogleListOfErrors(){	

	$('#user_password').on('blur', function () {
		$('#listOfErrors').fadeOut('slow');
	});

	$('#user_password').on('focus', function () {
		$('#listOfErrors').fadeIn('slow');
	});		

	$('#user_email').on('blur', function () {
		$('#listOfEmailErrors').fadeOut('slow');
	});

	$('#user_email').on('focus', function () {
		$('#listOfEmailErrors').fadeIn('slow');
	});	
}




