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
      $scope.availability = user.availability;
      $scope.renderEvents();
      $scope.availabilitySubmitted = true;
    } else {
      $scope.availability = {};
      $scope.renderEvents();
      $scope.availabilitySubmitted = false;
    }
    $scope.user = user;
    console.log($scope.user);
    $scope.company = user.companies[0];
    console.log("COMPANY ", $scope.company);
    Schedule.getUserSchedules($scope.company._id).then(function(schedules){
      console.log("SCHEDULES ", schedules);
      $scope.schedules = schedules;
      $scope.roles = [];
      $scope.userRoles = user.eligibleRoles;
      $scope.userRoles_ = angular.copy($scope.userRoles);
      for(var i = 0; i < $scope.schedules.length; i++){
        var sched = $scope.schedules[i];
        for(var j = 0; j < sched.roles.length; j++){
          if($scope.roles.indexOf(sched.roles[j].name) === -1){
            $scope.roles.push(sched.roles[j].name);
          }
        }
      }
    })
  });

});