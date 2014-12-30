'use strict';
var userApp = angular.module('userApp');

userApp.controller('availabilityController', function($scope, $location, User, Schedule){
  $scope.changed = false;
  $scope.updateChanged = function(){
    $scope.changed = true;
  };
  $scope.update = function(){
    $scope.changed = true
  };
  $scope.preferred = true;
  $scope.setPreferred = function(){
    $scope.preferred = true;
  };
  
  $scope.setAvailable = function(){
    $scope.preferred = false;
  };
  
  $scope.renderEvents = function(events){
    $scope.loadEvents();
  };

  $scope.updateAvailability = function(){
    var data = {
      availability: $scope.availability,
      eligibleRoles: $scope.userRoles,
      shiftsDesired: $scope.user.shiftsDesired
    }
    User.updateUserAvailability(data).then(function(updatedUser){
      $scope.changed = false;
      console.log("successful update");
    });
  }

  User.getUser().then(function(user){
    if(user.availability){
      $scope.availability = user.availability;
      $scope.renderEvents();
      $scope.availabilitySubmitted = true;
    } else {
      $scope.availability = [];
      $scope.renderEvents();
      $scope.availabilitySubmitted = false;
    }
    $scope.user = user;
    Schedule.getUserSchedules($scope.user.companies[0]._id).then(function(schedules){
      $scope.roles = [];
      console.log($scope.user);
      $scope.userRoles = $scope.user.eligibleRoles;
      for(var i = 0; i < schedules.length; i++){
        var sched = schedules[i];
        for(var j = 0; j < sched.roles.length; j++){
          if($scope.roles.indexOf(sched.roles[j].name) === -1){
            $scope.roles.push(sched.roles[j].name);
          }
        }
      }
    })
  });

});