'use strict';
var userApp = angular.module('userApp');

userApp.controller('availabilityController', function($scope, $location, User, Schedule){
    $scope.preferred = true;
    $scope.setPreferred = function(){
        $scope.preferred = true;
    };
    $scope.setAvailable = function(){
        $scope.preferred = false;
    };
	$scope.renderEvents = function(events){
	  $scope.loadEvents();
	}
    User.getUser().then(function(user){
    	if(user.availability){
    		$scope.availability = useravailability;
    		$scope.renderEvents();
   			$scope.availabilitySubmitted = true;
    	} else {
    		$scope.availability = {};
    		$scope.renderEvents();
   			$scope.availabilitySubmitted = false;
    	}
    	console.log(user);
    	$scope.company = user.companies[0];
    	console.log("COMPANY ", $scope.company);
    	Schedule.getUserSchedules($scope.company._id).then(function(schedules){
    		console.log("SCHEDULES ", schedules);
    		$scope.schedules = schedules;
    	})
    });

});