'use strict';
var userApp = angular.module('userApp');

userApp.controller('availabilityController', function($scope, $location, Availability){
    $scope.preferred = true;
    $scope.events = {};
    $scope.setPreferred = function(){
        $scope.preferred = true;
    };
    $scope.setAvailable = function(){
        $scope.preferred = false;
    };
});