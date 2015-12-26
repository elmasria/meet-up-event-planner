angular.module('EventPlanner').controller('EventNewController', function () {
	var controller = this;
	controller.errorMessage = '';
	controller.preventEvent = function(event){
		event.preventDefault();
	};
});