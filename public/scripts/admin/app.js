var adminApp = angular.module('adminApp', [
  'admin.services',
  'ui.router',
  'angularMoment'
]);

adminApp
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      .state('dashboard', {
        url: "/companydashboard",
        templateUrl: "partials/admin/dashboard.html"
      })
      .state('companydata', {
        url: "/companydata",
        templateUrl: "partials/admin/companydata.html"
      })
      .state('createschedule', {
        url: "/createschedule",
        templateUrl: "partials/admin/createschedule.html"
      }).state('editshifts', {
        url: "/editshifts",
        templateUrl: "partials/admin/editshifts.html"
      });
    $urlRouterProvider.otherwise("/companydashboard");
  })
  .controller('createScheduleController', function($scope, $http, $location, Network){
    $scope.options= {};
    $scope.statusMessage = "Loading your custom Schedule";
    $scope.showForm = true;
    $scope.showLoading = false;
    $scope.employees;
    $scope.shifts;
    Network.getEmployees($http, 'VitalVittles').then(function(data){
      $scope.employees = data;
    });

    Network.getShifts($http, 'VitalVittles').then(function(data){
      $scope.employees = data;
    });

    $scope.compileSchedule = function(){
      console.log("compiling")
      $scope.showForm = false;
      $scope.showLoading = true;
      $scope.statusMessage="Collecting unicorn blood.";
      var network = Network.createNetwork($scope.employees, $scope.shifts);
    };
  });