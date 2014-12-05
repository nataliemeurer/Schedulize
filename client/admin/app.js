var adminApp = angular.module('adminApp', [
  'admin.services',
  'ui.router'
]);

adminApp
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      .state('dashboard', {
        url: "/companydashboard",
        templateUrl: "/admin/partials/dashboard.html"
      })
      .state('companydata', {
        url: "/companydata",
        templateUrl: "/admin/partials/companydata.html"
      })
      .state('createschedule', {
        url: "/createschedule",
        templateUrl: "/admin/partials/createschedule.html"
      }).state('editshifts', {
        url: "/editshifts",
        templateUrl: "/admin/partials/editshifts.html"
      });
    $urlRouterProvider.otherwise("/companydashboard");
  })
  
  .controller('createScheduleController', function($scope, $http, $location, Network){
    $scope.options = {}; // to be used later for variations on the algorithm
    $scope.statusMessage = "Loading your custom Schedule";
    $scope.showForm = true;
    $scope.showLoading = false;
    Network.getEmployees($http, 'VitalVittles').then(function(data){
      $scope.employees = data.data;
    });

    Network.getShifts($http, 'VitalVittles').then(function(data){
      $scope.shifts = data.data;
    });

    $scope.compileSchedule = function(){
      console.log($scope.shifts);
      console.log($scope.employees);
      $scope.showForm = false;
      $scope.showLoading = true;
      var network = Network.createNetwork($scope.employees, $scope.shifts);
      $scope.statusMessage="Getting Users and Shifts.";
      return '';
    };
  })
  .controller('shiftController', function($scope, $http, $location, Shifts){
    $scope.shiftData = {};

    $scope.sendShift = function(){
      var data = $scope.shiftData;
      var newShift = {};
      // Assume shift spans same day
      data.endDay = data.day;
      // Turn string input into int
      data.startHours = parseInt(data.startHours);
      data.startMinutes = parseInt(data.startMinutes);
      data.endHours = parseInt(data.endHours);
      data.endMinutes = parseInt(data.endMinutes);
      // Change to Military time
      if( data.startampm === 'PM' ){
        if( data.startHours < 12 ){
          data.startHours += 12;
        }
        if( data.endampm === 'AM'){
          data.endDay = days.indexOf(data.day) < 7 ? days[days.indexOf(data.day) + 1] : days[0];
        } else {
          data.endHours += 12;
        }
      } else if( data.endampm === 'PM') {
        data.endHours += 12;
      }
      newShift.time = {
        start: {hour: data.startHours, minute: data.startMinutes},
        end: {hour: data.endHours, minute: data.endMinutes},
        day: data.day
      };
      newShift.endDay = data.endDay;
      newShift.day = data.day;
      newShift.type = data.shiftType;
      if( data.managerRestricted === 'true' ){
        newShift.restricted = true;
      } else {
        newShift.restricted = false;
      }
      Shifts.sendShift(newShift).then(function(doc){
        $location.path('/editshifts');
      });
    }
  });