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
		// Get logged in company
		$scope.company = company;
	});
})
.controller('employeeViewCtrl', function($scope, $http, $stateParams, $location, Employee){
	Employee.getOneEmployee($stateParams.employeeId).then(function(employee){
		$scope.employee = employee;
		console.log(employee);
		$scope.viewMode = "overview";
		$scope.setMode = function(mode){
			$scope.viewMode = mode; 
		}
		$scope.loadEvents();
	});

	$scope.makeAdmin = function(){
		swal({ 
		  title: "Are you sure?", 
		  text: "Making this user an admin will give them all of your administrative privileges.",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, give them the power!",
		  closeOnConfirm: false 
		}, function(){
		  swal("Success!", $scope.employee.name + " is now an administrator.", "success");
		});
	};

	$scope.removeEmployee = function(){

	};
});