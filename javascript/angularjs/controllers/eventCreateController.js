angular.module('EventPlanner').controller('EventNewController', function () {
	var controller = this;
	controller.errorMessage = '';
	controller.Gests = [];
	controller.gestEmail = '';
	controller.listOfInvitedGests = [{'useremail':'ahmad@ahmad.com'},{'useremail':'ranim@ranim.com'},{'useremail':'farah@farah.com'}];
	controller.preventEvent = function(event){
		event.preventDefault();
	};
	controller.toogleActive = function (event, gest) {
		var checkactive = event.currentTarget.classList.contains('active');
		if (checkactive) {
			event.currentTarget.classList.remove('active');
			controller.Gests.splice(controller.Gests.indexOf(gest),1);
		}else{
			event.currentTarget.classList.add('active');
			controller.Gests.push(gest);			
		}
	};
	controller.removeGest = function (gest) {
		if (controller.Gests.indexOf(gest) > -1) {
			controller.Gests.splice(controller.Gests.indexOf(gest),1);
		}
	};

	controller.addNewGest = function () {
		var gestuser = {'useremail': controller.gestEmail};
		controller.Gests.push(gestuser);
	};
});