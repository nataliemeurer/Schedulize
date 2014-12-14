'use strict';
var adminApp = angular.module('adminApp');

adminApp.controller('scheduleManagerCtrl', function($scope, $http, $location){
	$http.get("/api/schedules")
    .success(function(data, status){
      for(var i = 0; i < data.length; i++){
        data[i].createdAt = moment(data[i].createdAt).format('MMMM Do, YYYY');
      }
      console.log(data);
      $scope.schedules = data;
    });
  $scope.activeSchedule = null;
  var setActiveSchedule = function(schedule){
    $scope.activeSchedule = schedule;
  };
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