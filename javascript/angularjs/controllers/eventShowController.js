angular.module('EventPlanner').controller('EventShowController', function ($filter) {
	var controller = this,
	jsondata='';
	jsondata = JSON.parse(localStorage.getItem('EventPlanerDB'));
	controller.events = jsondata.events;
	controller.eventTypes = [];

	controller.preventEvent = function(event){
		event.preventDefault();
	};

	controller.filterEventType = function (eventType) {
		controller.events= [];
		for(var i= 0; i< jsondata.events.length; i++){
			if (jsondata.events[i].eventType === eventType || eventType === 'all') {
				controller.events.push(jsondata.events[i]);
			}
		}
	};

	controller.showMoreDetails = function (singleEventarg) {
		controller.singleEvent = singleEventarg;	
	};

	for(var i= 0; i< jsondata.events.length; i++){
		if (controller.eventTypes.indexOf(jsondata.events[i].eventType) == -1) {
			controller.eventTypes.push(jsondata.events[i].eventType);
		}
	}
});