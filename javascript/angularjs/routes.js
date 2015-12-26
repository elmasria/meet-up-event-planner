angular.module('EventPlanner').config(function ($routeProvider) {
	$routeProvider.when('/home',{
		templateUrl: '/templates/event/show.html'
	}).when('/register',{
		templateUrl: '/templates/user/register.html'
	})
	.when('/create-event',{
		templateUrl: '/templates/event/new.html'
	})
	.otherwise({redirectTo: '/register'});
});