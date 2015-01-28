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
		$scope.completeList = [];
		$scope.incompleteList = [];
		for(var i =0; i < company.employees.length; i++){
			if(company.employees[i].availability.length){
				$scope.completeList.push(company.employees[i].name);
			} else {
				$scope.incompleteList.push(company.employees[i].name);
			}
		} 
	});
})
.controller('employeeViewCtrl', function($scope, $http, $stateParams, $location, Employee){
	Employee.getOneEmployee($stateParams.employeeId).then(function(employee){
		$scope.employee = employee;
		console.log(employee);
		$scope.viewMode = "overview";
		$scope.setMode = function(mode){
			$scope.viewMode = mode; 
		};
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
		  Employee.toggleAdmin($scope.employee._id).then(function(user){
		  	$scope.employee = user;
		  	swal("Success!", $scope.employee.name + " is now an administrator.", "success");
		  });
		});
	};

	$scope.removeAdmin = function(){
		swal({ 
		  title: "Are you sure?", 
		  text: "This action will remove all administrative privileges for this user.",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes",
		  closeOnConfirm: false 
		}, function(){
		  Employee.toggleAdmin($scope.employee._id).then(function(user){
		  	$scope.employee = user;
		  	swal("Success", $scope.employee.name + " is no longer an administrator.", "success");
		  });
		});
	};

	$scope.removeEmployee = function(){

	};
});