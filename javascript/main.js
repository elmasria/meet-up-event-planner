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

	$('#event_startDate').on('blur', function () {
		$('#listOfStartDateErrors').fadeOut('slow');
	});

	$('#event_startDate').on('focus', function () {
		$('#listOfStartDateErrors').fadeIn('slow');
	});	

	$('#event_endtDate').on('blur', function () {
		$('#listOfEndDateErrors').fadeOut('slow');
	});

	$('#event_endtDate').on('focus', function () {
		$('#listOfEndDateErrors').fadeIn('slow');
	});	

	$('#event_guestEmail').on('blur', function () {
		$('#listOfEmailErrors').fadeOut('slow');
	});

	$('#event_guestEmail').on('focus', function () {
		$('#listOfEmailErrors').fadeIn('slow');
	});	

}


var meetUpEventPlannerDB;


var NewUser = function  (fName, lName, email, password, doBirth, cName, CountryName, gender, biography) {	
	this.newUser = {};
	this.newUser.firstName = fName;
	this.newUser.lastName = lName;
	this.newUser.email = email;
	this.newUser.password = password;
	this.newUser.dateOfBirth = doBirth;
	this.newUser.companyName = cName;
	this.newUser.countryName = CountryName;
	this.newUser.gender = gender;
	this.newUser.biography = biography;
	return this.newUser;

};

var NewEvent = function  () {	
	this.addEvent = function (eName, eType, eStartDate, eEndDate, eLocation, eGuestList, eMessage) {
		this.newEvent = {};
		this.newEvent.eventName=eName;
		this.newEvent.eventType=eType ;
		this.newEvent.eventStartDate=eStartDate;
		this.newEvent.eventEndtDate = eEndDate;
		this.newEvent.eventLocation=eLocation;
		this.newEvent.eventGuestList = eGuestList;
		this.newEvent.eventMessage = eMessage; 
		return this.newEvent;
	};
};

NewEvent.prototype.addStartDate = function (sDate, sHour, sMin) {	
	this.newDate = {};
	this.newDate.eventStartDate = sDate;
	this.newDate.eventStartHour = sHour;
	this.newDate.eventStartMinute = sMin;
	return this.newDate;
};

NewEvent.prototype.addEndDate = function (sDate, sHour, sMin) {	
	this.newDate = {};
	this.newDate.eventEndtDate = sDate;
	this.newDate.eventEndHour = sHour;
	this.newDate.eventSEndMinute = sMin;
	return this.newDate;
};


NewEvent.prototype.addLocation = function (eventLocation, stNumber, route, locality, state, pCode, country, eHost) {	
	this.newLocation = {};
	this.newLocation.eventLocation = eventLocation;
	this.newLocation.street_number = stNumber;
	this.newLocation.route = route;
	this.newLocation.locality = locality;
	this.newLocation.State = state;
	this.newLocation.postal_code = pCode;
	this.newLocation.country = country;
	this.newLocation.eventHost = eHost;
	return this.newLocation;
};


NewEvent.prototype.addguest = function (emails) {
	this.listOfInvitedGuest = [];	
	for(var i = 0 ;i < emails.length;i++){
		this.newGuest = {};
		this.newGuest.useremail = emails[i];
		this.newGuest.isInvited = true;
		this.newGuest.isMember = false;
		this.listOfInvitedGuest.push(this.newGuest);
	}
	return this.listOfInvitedGuest;
};


if(localStorage.getItem('EventPlanerDB')) {
	var db = JSON.parse(localStorage.getItem('EventPlanerDB'));
	if(db.events.length>0){

	}else{
		var testEvent = new NewEvent();
		var strateDate = new testEvent.addStartDate('29-Jan-2017','8','00');
		var EndDate = new testEvent.addEndDate('29-Jan-2017','20','00');
		var EventLocation = new testEvent.addLocation('Beirut, Lebanon','24', 'isteklal', 'Beirut', 'beirut', '110300', 'Lebanon', 'Quadrus Conference Center');
		var Guests = new testEvent.addguest(['guest1@email.com','guest2@email.com','guest3@email.com','guest4@email.com']);
		var testEvent = new testEvent.addEvent('Intersect 2016', 'Live Stream', strateDate, EndDate, EventLocation, Guests, 'A one day summit for Nanodegree students and grads to connect with some of Silicon Vally\'s top companies, thought leaders and Udacity instructors.');
		db.events.push(testEvent);


		var testEvent2 = new NewEvent();
		var strateDate2 = new testEvent2.addStartDate('29-Jan-2017','8','00');
		var EndDate2 = new testEvent2.addEndDate('29-Jan-2017','20','00');
		var EventLocation2 = new testEvent2.addLocation('Beirut, Lebanon','24', 'isteklal', 'Beirut', 'beirut', '110300', 'Lebanon', 'Quadrus Conference Center');
		var Guests2 = new testEvent2.addguest(['guest1@email.com','guest2@email.com','guest3@email.com','guest4@email.com']);
		var event2 = new testEvent2.addEvent('Imagine Cup', 'Student competition', strateDate, EndDate, EventLocation, Guests, 'Imagine Cup is a global student technology program and competition that provides opportunities for students across all disciplines to team up and use their creativity, passion and knowledge of technology to create applications, games and integrate solutions that can change the way we live, work and play.');
		db.events.push(event2);

		localStorage.removeItem('EventPlanerDB');
		localStorage.setItem('EventPlanerDB',JSON.stringify(db));
		db = JSON.parse(localStorage.getItem('EventPlanerDB'));
	}
	if(db.users.length === 0){
		var testUser = new NewUser('Ahmad', 'El Masri', 'ahmadjelmasri@gmail.com', 'Passw0rd123', '25-July-1988', '', 'Lebanon', 'Male', 'Ahmad bio');
		db.users.push(testUser);
		localStorage.removeItem('EventPlanerDB');
		localStorage.setItem('EventPlanerDB',JSON.stringify(db));
		db = JSON.parse(localStorage.getItem('EventPlanerDB'));
	}
}else{
	meetUpEventPlannerDB = {events: [], users:[],loggedInUser:''};
	var testUser = new NewUser('Ahmad', 'El Masri', 'ahmadjelmasri@gmail.com', 'Passw0rd123', '25-July-1988', '', 'Lebanon', 'Male', 'Ahmad bio');
	meetUpEventPlannerDB.users.push(testUser);
	var testEvent = new NewEvent();
	var strateDate = new testEvent.addStartDate('29-Jan-2017','8','00');
	var EndDate = new testEvent.addEndDate('29-Jan-2017','20','00');
	var EventLocation = new testEvent.addLocation('Beirut, Lebanon','24', 'isteklal', 'Beirut', 'beirut', '110300', 'Lebanon', 'Quadrus Conference Center');
	var Guests = new testEvent.addguest(['guest1@email.com','guest2@email.com','guest3@email.com','guest4@email.com']);
	var event1 = new testEvent.addEvent('Intersect 2016', 'Live Stream', strateDate, EndDate, EventLocation, Guests, 'A one day summit for Nanodegree students and grads to connect with some of Silicon Vally\'s top companies, thought leaders and Udacity instructors.');
	meetUpEventPlannerDB.events.push(event1);



	var testEvent2 = new NewEvent();
	var strateDate2 = new testEvent2.addStartDate('29-Jan-2017','8','00');
	var EndDate2 = new testEvent2.addEndDate('29-Jan-2017','20','00');
	var EventLocation2 = new testEvent2.addLocation('Beirut, Lebanon','24', 'isteklal', 'Beirut', 'beirut', '110300', 'Lebanon', 'Quadrus Conference Center');
	var Guests2 = new testEvent2.addguest(['guest1@email.com','guest2@email.com','guest3@email.com','guest4@email.com']);
	var event2 = new testEvent2.addEvent('Imagine Cup', 'Student competition', strateDate, EndDate, EventLocation, Guests, 'Imagine Cup is a global student technology program and competition that provides opportunities for students across all disciplines to team up and use their creativity, passion and knowledge of technology to create applications, games and integrate solutions that can change the way we live, work and play.');
	meetUpEventPlannerDB.events.push(event2);


	localStorage.setItem('EventPlanerDB',JSON.stringify(meetUpEventPlannerDB));

}
