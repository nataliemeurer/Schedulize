var userApp = angular.module('userApp', [
  'user.services',
  'ui.router',
  'angularMoment'
  ]);

userApp
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
  .state('dashboard', {
    url: "/dashboard",
    templateUrl: "partials/user/dashboard.html"
  })
  .state('userprofile', {
    url: "/profile",
    templateUrl: "partials/user/userprofile.html"
  })
  .state('submitted', {
    url: "/submitted",
    templateUrl: "partials/user/submitted.html"
  })
  .state('setavailability', {
    url: "/availability",
    templateUrl: "partials/user/availability.html"
  });

  $urlRouterProvider.otherwise("/dashboard");
})
.controller('availabilityController', function($scope, $location, Availability){
    //object to be filled out with form
    $scope.availabilityData = {};
    $scope.markedShifts = 0;
    $scope.timeSlots = Availability.slots;
    $scope.mouseDown = false;
    
    $scope.toggleAvailability = function(shift) {
      if($scope.mouseDown){
        if(shift.available){
          $scope.markedShifts--;
          shift.available = false;
          shift.tentative = true;
        } else if (shift.tentative === true){
          shift.tentative = false;
        } else {
          $scope.markedShifts++;
          shift.available = true;
        }
      }
    };

    $scope.getClass = function(path) {
        if ($location.path().substr(0, path.length) == path) {
          return "active";
        } else {
          return "";
        }
    };

    $scope.sendAvailability = function(filledSlots){
      $scope.availabilityData['availability'] = filledSlots;
      Availability.sendAvailability($scope.availabilityData).then(function(data){
        $location.path('/submitted');
      });
    };

    $scope.setSelect = function(){
      $scope.mouseDown = true;
    };

    $scope.stopSelect = function(){
      $scope.mouseDown = false;
    };

  })
.controller('dashboardController', function($scope,$location){

});