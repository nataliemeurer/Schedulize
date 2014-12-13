'use strict';
var adminApp = angular.module('adminApp');

adminApp.controller('scheduleManagerCtrl', function($scope, $location){
	$scope.schedules = [
	{_id: 51, name: 'Vital Vittles Fall 2014', dateCreated: 'November 21, 2014', totalShifts: 120}, 
	{_id: 52, name: 'UG Fall 2014', dateCreated: 'November 21, 2014', totalShifts: 135}, 
	{_id: 53, name: 'The Hilltoss Fall 2014', dateCreated: 'November 30, 2014', totalShifts: 156}];
})
.controller('createScheduleCtrl', function($scope){
	$scope.template = false;
	$scope.templateSchedule = "hello";
});