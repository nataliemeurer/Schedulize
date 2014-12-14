'use strict';
var adminApp = angular.module('adminApp');

adminApp
.controller('scheduleManagerCtrl', function($scope, $http, $location, Schedule){
  Schedule.getAllSchedules().then(function(data){
    $scope.schedules = data;
  })
})
.controller('scheduleViewCtrl', function($scope, $stateParams){
  var scheduleId = $stateParams.scheduleId;
  // for(var i = 0; i < $scope.$parent.schedules.length; i++){
  //   if($scope.$parent.schedules[i]._id === $scope.scheduleId){
  //     $scope.activeSchedule = $scope.$parent.schedules[i];
  //   
  // }
})
.controller('createScheduleCtrl', function($scope, $http, $location){
	$scope.template = false;
	$scope.templateSchedule = null;
	$scope.newSchedule = {};
	$scope.newSchedule.template = false;
  $scope.newSchedule.name = "";
  console.log($scope);
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
