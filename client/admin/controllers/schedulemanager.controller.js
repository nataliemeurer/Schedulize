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
  $scope.editableSchedule = true;

  // Called after finding the schedule
  $scope.renderEvents = function(events){
    console.log($scope.loadEvents)
    $scope.loadEvents(events);
  }

  // Get current schedule
  Schedule.getOneSchedule($stateParams.scheduleId).then(function(schedule){
    $scope.activeSchedule = schedule;
    $scope.renderEvents($scope.activeSchedule.shifts);
    $scope.scheduleMode = $scope.activeSchedule.roles.length ? $scope.activeSchedule.roles[0].name : null;
    console.log($scope.scheduleMode);
  });

  $scope.setScheduleMode = function(mode){
    $scope.scheduleMode = mode;
    console.log($scope.scheduleMode);
  }

  // Add a Role to the Schedule
  $scope.addRole = function(){
    var role = $('#role-input').val();
    $('#role-input').val('');
    if(!$scope.activeSchedule.roles.length){
      $scope.scheduleMode = role;
    }
    $scope.activeSchedule.roles.push({name: role});
    $scope.changed = true;
    console.log($scope.scheduleMode);
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
