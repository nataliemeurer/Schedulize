'use strict';
var adminApp = angular.module('adminApp');

adminApp
.controller('employeeManagerCtrl', function($scope, $http, $location, Company, Schedule){
	Company.getCompanyData().then(function(company){
		$scope.company = company;
	});
})
.controller('employeeOverviewCtrl', function($scope, $http, $location, Company, Schedule){
	Company.getCompanyData().then(function(company){
		$scope.company = company;
	});
})
.controller('employeeViewCtrl', function($scope, $http, $stateParams, $location, Employee){
	Employee.getOneEmployee($stateParams.employeeId).then(function(employee){
		$scope.employee = employee;
	});
});