'use strict';
var adminApp = angular.module('adminApp');

adminApp
.controller('scheduleManagerCtrl', function($scope, $http, $location, Schedule){
  // Get all Schedules(eventually for logged in company)
  Schedule.getAllSchedules().then(function(data){
    $scope.schedules = data;
  });
})
.controller('scheduleViewCtrl', function($scope, $stateParams, Schedule){
  $scope.changed = false;

  // Get current schedule
  Schedule.getOneSchedule($stateParams.scheduleId).then(function(schedule){
    $scope.activeSchedule = schedule;
  });

  // Add a Role to the Schedule
  $scope.addRole = function(){
    var role = $('#role-input').val();
    $('#role-input').val('');
    $scope.activeSchedule.roles.push(role);
    $scope.changed = true
  }

  // Save changes when made to the schedule
  $scope.saveChanges = function(schedule){
    Schedule.updateSchedule(schedule).then(function(schedule){
      $scope.changed = false;
      $scope.activeSchedule = schedule;
      console.log("Update Schedule");
    });
  };
  $scope.deleteSchedule = function(schedule){
    Schedule.deleteSchedule(schedule).then(function(schedule){
      console.log("Schedule Deleted");
    });
  };

})
.controller('createScheduleCtrl', function($scope, $http, $location, Schedule){
	$scope.newSchedule = {
    template: false,
    name: "",
    templateSchedule: null
  };
	$scope.submitSchedule = function(schedule){
    Schedule.postNewSchedule(schedule)
			.success(function(data, status){
        console.log("successful POST", status);
        data.createdAt = moment(data.createdAt).format('MMMM Do, YYYY');
        // Prepend to schedules for fast UX
        $scope.$parent.schedules.unshift(data);
      });
	};
});
