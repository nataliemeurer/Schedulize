var adminApp = angular.module('adminApp', [
  'admin.services',
  'ui.router',
  'angularMoment'
]);

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
    $scope.options = {}; // to be used later for variations on the algorithm
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
      var network = Network.createNetwork($scope.employees, $scope.shifts);
      $scope.statusMessage="Getting Users and Shifts.";
    };
  })
  .controller('shiftController', function($scope, $http, $location, Shifts){
    $scope.shiftData = {};

    $scope.sendShift = function(){
      var data = $scope.shiftData;
      var newShift = {};
      data.endDay = data.day;
      data.startHours = parseInt(data.startHours);
      data.startMinutes = parseInt(data.startMinutes);
      data.endHours = parseInt(data.endHours);
      data.endMinutes = parseInt(data.endMinutes);
      if( data.startampm === 'PM' ){
        if( data.startHours < 12 ){
          data.startHours += 12;
        }
        if( data.endampm === 'AM'){
          data.endDay = days.indexOf(data.day) < 7 ? days[days.indexOf(data.day) + 1] : days[0];
        } else {
          data.endHours += 12;
        }
      } else if( data.endHours === 'PM') {
        data.endHours += 12;
      }

      newShift.time = {
        start: moment({hour: $scope.shiftData.startHours, minute: $scope.shiftData.startMinutes}).day($scope.shiftData.day),
        end: moment({hour: $scope.shiftData.endHours, minute: $scope.shiftData.endMinutes}).day($scope.shiftData.endDay)
      };
      newShift.day = data.day;
      newShift.type = data.type;
      Shifts.sendShift(newShift).then(function(doc){
        console.log('SENT THAT SHIFT');
        $location.path('/editshifts');

      });
    }
  });

  