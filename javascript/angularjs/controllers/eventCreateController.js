angular.module('EventPlanner').controller('EventNewController', function ($filter, $resource, $location) {
	var controller = this;
	var foursquareClientID = '&oauth_token=CRE2N2IININ300LAW02N4R5BCL3NP1X1A14JERVXK3B4KUBN&v=20151229';
	var foursquareUrl = 'https://api.foursquare.com/v2/venues/search?near=';
	controller.validateNewEventForm = true;
	controller.progressPercent = 100;
	controller.errorMessage = '';
	controller.Guests = [];
	controller.guestEmail = '';
	controller.listOfAvailableMembers = [];


	controller.preventEvent = function(event){
		event.preventDefault();
	};
	
	/// --------------		Guest region		--------------///
	var dataBase ;
	if(localStorage.getItem('EventPlanerDB')) {
		dataBase = JSON.parse(localStorage.getItem('EventPlanerDB'));
	}else{
		dataBase = {'users': [],'events': [], 'loggedInUser':''};
	}
	var existingEmail = [];
	for (var i = 0; i < dataBase.users.length; i++) {
		var objEmail = {};
		objEmail.useremail = JSON.parse(dataBase.users[i]).email;
		objEmail.isInvited = false;
		objEmail.isMember = true;
		existingEmail.push(objEmail);
	}
	if (existingEmail.length <=0) {
		controller.noUsers = true;
	}else{

		controller.listOfAvailableMembers = existingEmail;
	}

	controller.toogleActive = function (guest) {
		var checkactive = !guest.isInvited ;
		if (checkactive) {
			controller.Guests.splice(controller.Guests.indexOf(guest),1);
		}else{
			controller.Guests.push(guest);			
		}
	};
	controller.removeguest = function (guest) {
		if (typeof(guest.useremail) !== 'undefined') {
			if (controller.Guests.indexOf(guest) > -1) {
				if (guest.isMember) {
					controller.listOfAvailableMembers[controller.listOfAvailableMembers.indexOf(guest)].isInvited = false;
				}
				controller.Guests.splice(controller.Guests.indexOf(guest),1);
			}
		}
	};
	controller.addNewguest = function () {
		controller.showError = false;
		var listOfInvitedGuest = controller.Guests;
		var listOfAvailableMembers = controller.listOfAvailableMembers;
		var inputGuestEmail = controller.guestEmail;
		var existingMember = $filter('filter')(listOfAvailableMembers, inputGuestEmail);
		var invitedUsers = $filter('filter')(listOfInvitedGuest, inputGuestEmail);

		//check if input is valid email
		if (typeof(inputGuestEmail) !== 'undefined') {
			// input email is valid 
			// check if guest user is invited 
			if (invitedUsers.length > 0) {
				controller.errorMessage = inputGuestEmail + ' available in the list';
				controller.showError = true;
				$('html,body').animate({scrollTop:0},'slow');
			}else{
				// user is not invited
				// check if user exist as member
				if (existingMember.length > 0) {
					// user exists, add it to the invitation list
					listOfInvitedGuest.push(existingMember[0]);
					// mark user as invited,
					existingMember[0].isInvited = true;
					
				}else{
					// define new user as json data.
					var guestuser = {'useremail': inputGuestEmail, 'isInvited': true, 'isMember': false};
					// add new user to the list of invitation
					listOfInvitedGuest.push(guestuser);
				}
			}
		}
	};
	/// --------------		Guest region		--------------/// 

	/// --------------		foursquare region		--------------///

	controller.getListOfHosts = function () {		
		var dataListElement = document.getElementById('eventHostList');
		var options = '';
		var nearPlace = typeof(controller.locality) !== 'undefined'? controller.locality : typeof(controller.State) !== 'undefined'? controller.State : controller.country;
		var eventType = controller.eventType;
		var trueUrl = (typeof(nearPlace) !== 'undefined') && (typeof(eventType) !== 'undefined');
		var url = foursquareUrl + nearPlace + '&query='  + eventType + foursquareClientID;
		var optionLength = dataListElement.children.length;
		// remove all opions from datalist.
		while(optionLength > 0){
			optionLength--;
			dataListElement.removeChild(dataListElement.children[optionLength]);
		}
		if (trueUrl) {
			$resource(url).get().$promise.then(function(data){
					var listOfVenues = data.response.venues;
					// add new options to datalist
					for (var i = listOfVenues.length - 1; i >= 0; i--) {
						options += '<option value="' + listOfVenues[i].name + '" />';
					}
					dataListElement.innerHTML = options;
				}).catch(function(errors){
				//console.log(errors.statusText);
			}).finally(function () {				
			});
		}
	};
	/// --------------		foursquare region		--------------///


	/// --------------		Validation region		--------------///

	controller.validationProcess = function () {
		var eventFormPassed = false; // this is a reference to check if all required input are valid
		// define variables for all the required input based on the ng-model variable 
		var eventFormPassedEventName = checkRequiredFiled(controller.eventName);
		var eventFormPassedEventType = checkRequiredFiled(controller.eventType);
		var eventFormPassedState = checkRequiredFiled(controller.State);
		var eventFormPassedCountry = checkRequiredFiled(controller.country);
		var eventFormPassedEventHost =  checkRequiredFiled(controller.eventHost);

		// check if all required input are valid
		if(eventFormPassedEventName && 
			eventFormPassedEventType && 
			eventFormPassedState && 
			eventFormPassedCountry &&
			eventFormPassedEventHost){
			// all required input are valid
			eventFormPassed = true;
		}else{
			// some or all input are invalid
			eventFormPassed = false;
		}


		if (eventFormPassed) {
			// form is valid ==> enable the submit button
			controller.validateNewEventForm = false;
		}else{
			// form is invalid ==> disable the submit button
			controller.validateNewEventForm = true;
		}
	};

	var checkRequiredFiled =  function (controllerName) {
		if (typeof (controllerName) !== 'undefined') {
			// input has value ==> is valid
			return true;
		}else {
			// input is empty ==> is invalid
			return false;
		}
	};

	/// --------------		Validation region		--------------///


	/// --------------		Save Event region		--------------///

	controller.addNewEvent = function(){
		angular.element($('#event_Location')).triggerHandler('input');
		var jsondata ;
		if(localStorage.getItem('EventPlanerDB')) {
			jsondata = JSON.parse(localStorage.getItem('EventPlanerDB'));
		}else{
			jsondata = {'users': [],'events': [], 'loggedInUser':''};
		}
		var newEvent = {};
		newEvent.eventName=controller.eventName;
		newEvent.eventType=controller.eventType ;
		newEvent.eventStartDate={};
		newEvent.eventStartDate.eventStartDate = controller.eventStartDate ;
		newEvent.eventStartDate.eventStartHour =  controller.eventStartHour ;
		newEvent.eventStartDate.eventStartMinute =  controller.eventStartMinute;
		newEvent.eventEndtDate = {};
		newEvent.eventEndtDate.eventEndtDate = controller.eventEndtDate ;
		newEvent.eventEndtDate.eventEndHour =  controller.eventEndHour ;
		newEvent.eventEndtDate.eventSEndMinute =  controller.eventEndMinute;
		newEvent.eventLocation={};
		newEvent.eventLocation.eventLocation = controller.eventLocation;
		newEvent.eventLocation.street_number = controller.street_number;
		newEvent.eventLocation.route = controller.route;
		newEvent.eventLocation.locality = controller.locality;
		newEvent.eventLocation.State = controller.State;
		newEvent.eventLocation.postal_code = controller.postal_code;
		newEvent.eventLocation.country = controller.country;
		newEvent.eventLocation.eventHost= controller.eventHost; 
		newEvent.eventGuestList=controller.Guests;
		newEvent.eventMessage=controller.event_optionalMessage;
		var existingEvent = [];
		for (var i = 0; i < jsondata.events.length; i++) {
			existingEvent.push(jsondata.events[i].eventName);
		}
		var eventExist = $filter('filter')(existingEvent, controller.eventName);
		if (eventExist.length > 0) {
			controller.errorMessage = controller.eventName + ' already exist !';
			controller.showError = true;
			$('html,body').animate({scrollTop:0},'slow');
		}
		else{
			controller.errorMessage = '';
			controller.showError = false;
			jsondata.events.push(newEvent);
			localStorage.setItem('EventPlanerDB',JSON.stringify(jsondata));
			$location.path('/home');
		}
	};

	/// --------------		Save Event region		--------------///

});