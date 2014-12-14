'use strict';
var adminApp = angular.module('adminApp');

adminApp
.controller('scheduleManagerCtrl', function($scope, $http, $location, Schedule){
  // Get all Schedules(eventually for logged in company)
  Schedule.getAllSchedules().then(function(data){
    $scope.schedules = data;
  })
})
.controller('scheduleViewCtrl', function($scope, $stateParams, Schedule){
  // Get current schedule
  Schedule.getOneSchedule($stateParams.scheduleId).then(function(schedule){
    $scope.activeSchedule = schedule;
  });
})
.controller('createScheduleCtrl', function($scope, $http, $location){
	$scope.template = false;
	$scope.templateSchedule = null;
	$scope.newSchedule = {};
	$scope.newSchedule.template = false;
  $scope.newSchedule.name = "";
	$scope.newSchedule.templateSchedule = null;
	$scope.submitSchedule = function(schedule){
		// Send to server
		if($scope.newSchedule.template){
			$scope.newSchedule.shifts = $scope.newSchedule.templateSchedule.shifts;
			$scope.newSchedule.totalShifts = $scope.newSchedule.templateSchedule.totalShifts;
		}
		$http.post("/api/schedules", $scope.newSchedule)
			.success(function(data, status){
        console.log("successful POST", status);
        data.createdAt = moment(data.createdAt).format('MMMM Do, YYYY');
        // Prepend to schedules for fast UX
        $scope.$parent.schedules.unshift(data);
      });
	};
});
