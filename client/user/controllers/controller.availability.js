'use strict';

userApp.controller('availabilityController', function($scope, $location, Availability){
    $scope.preferred = true;
    $scope.events = {};
    $scope.setPreferred = function(){
        $scope.preferred = true;
    }
    $scope.setAvailable = function(){
        $scope.preferred = false;
    }
    // //object to be filled out with form
    // $scope.availabilityData = {};
    // $scope.markedShifts = 0;
    // $scope.mouseDown = false;
    
    // $scope.toggleAvailability = function(shift) {
    //   if($scope.mouseDown){
    //     if(shift.available){
    //       $scope.markedShifts--;
    //       shift.available = false;
    //       shift.tentative = true;
    //     } else if (shift.tentative === true){
    //       shift.tentative = false;
    //     } else {
    //       $scope.markedShifts++;
    //       shift.available = true;
    //     }
    //   }
    // };

    // $scope.getClass = function(path) {
    //     if ($location.path().substr(0, path.length) == path) {
    //       return "active";
    //     } else {
    //       return "";
    //     }
    // };

    // $scope.sendAvailability = function(filledSlots){
    //   $scope.availabilityData['availability'] = filledSlots;
    //   Availability.sendAvailability($scope.availabilityData).then(function(data){
    //     $location.path('/submitted');
    //   });
    // };

    // $scope.setSelect = function(){
    //   $scope.mouseDown = true;
    // };

    // $scope.stopSelect = function(){
    //   $scope.mouseDown = false;
    // };

  });