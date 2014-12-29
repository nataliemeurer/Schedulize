'use strict';
var adminApp = angular.module('adminApp');

adminApp
.controller('employeeManagerCtrl', function($scope, $http, $location, Company, Schedule){
	Company.getCompanyData().then(function(company){
		$scope.company = company;
	});
});