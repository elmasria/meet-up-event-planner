angular.module('EventPlanner').controller('EventNewController', function ($filter) {
	var controller = this;
	controller.errorMessage = '';
	controller.Guests = [];
	controller.guestEmail = '';
	controller.listOfAvailableMembers = [
	{'useremail':'ahmad@ahmad.com', 'isInvited': false, 'isMember': true},
	{'useremail':'ranim@ranim.com', 'isInvited': false,'isMember': true},
	{'useremail':'farah@farah.com', 'isInvited': false, 'isMember': true}
	];
	controller.preventEvent = function(event){
		event.preventDefault();
	};
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
});