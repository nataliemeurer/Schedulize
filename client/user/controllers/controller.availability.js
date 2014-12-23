'use strict';
var userApp = angular.module('userApp');

userApp.controller('availabilityController', function($scope, $location, Availability){
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
    Availability.getAvailability().then(function(availability){
    	if(availability){
    		$scope.availability = availability;
    		$scope.renderEvents();
   			$scope.availabilitySubmitted = true;
    	} else {
    		$scope.availability = {};
    		$scope.renderEvents();
   			$scope.availabilitySubmitted = false;
    	}
    });

});