'use strict';
var adminApp = angular.module('adminApp');

adminApp
.controller('scheduleManagerCtrl', function($scope, $http, $location, Company, Schedule){
  // Get all Schedules(eventually for logged in company)
  Company.getCompanyData().then(function(company){
    $scope.company = company;
    Schedule.getCompanySchedules(company._id).then(function(schedules){
      $scope.schedules = schedules;
    });
  });
})
.controller('scheduleViewCtrl', function($scope, $stateParams, $state, Company, Schedule){
  // Scope Variables
  $scope.changed = false;
  $scope.editableSchedule = true;
  $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
    console.log(event);
    if($scope.changed){
      event.preventDefault();
      swal({
        title: "Unsaved Changes!", 
        text: "Are you sure you want to leave without saving your changes?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, I want to leave",
        closeOnConfirm: false 
      }, function(){
        
      });
    }
  });
  var colors = ['#26A65B', '#466272', '#009688', '#C40000', '#FF9800', '#673AB7', '#1C262B'];// [dark blue, orange, teal, red, purple, green] green, red, purple, teal, orange]

  Company.getCompanyData().then(function(company){
    $scope.company = company;
    // Get current schedule on initialization
    Schedule.getOneSchedule($stateParams.scheduleId, company._id).then(function(schedule){
      $scope.activeSchedule = schedule;
      $scope.renderEvents($scope.activeSchedule.shifts);
      $scope.scheduleRole = $scope.activeSchedule.roles.length ? $scope.activeSchedule.roles[0] : null;
    });
  });


  // Called after finding the schedule
  $scope.renderEvents = function(events){
    $scope.loadEvents();
  }

  $scope.setScheduleMode = function(role){
    $scope.scheduleRole = role;
  }

  // Add a Role to the Schedule
  $scope.addRole = function(){
    var role = $('#role-input').val();
    $('#role-input').val('');
    if(!$scope.activeSchedule.roles.length){
      $scope.scheduleRole = role;
    }
    $scope.activeSchedule.roles.push({ name: role, color: colors[$scope.activeSchedule.roles.length] });
    $scope.changed = true;
    console.log($scope.scheduleRole);
  }

  // Save changes when made to the schedule
  $scope.saveChanges = function(schedule){
    Schedule.updateSchedule(schedule).then(function(schedule){
      $scope.changed = false;
      $scope.activeSchedule = JSON.parse(JSON.stringify(schedule));
    });
  };
  $scope.deleteSchedule = function(schedule){
    swal({ 
      title: "Are you sure?", 
      text: "You will not be able to recover this schedule once deleted!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false 
    }, function(){
      swal("Deleted!", "Your schedule has been deleted.", "success");
      Schedule.deleteSchedule(schedule).then(function(deletedCount){
        Schedule.getCompanySchedules($scope.company._id).then(function(schedules){
          for(var i = 0; i < schedules.length; i++){
            if(schedules[i]._id === schedule._id){
              schedules.splice(i, 1);
            }
          }
        });
        $state.go('schedulemanager.getstarted');
      });
    });
  };

})
.controller('createScheduleCtrl', function($scope, $http, $location, Schedule){
	$scope.newSchedule = {
    template: false,
    name: "",
    templateSchedule: null
  };
	$scope.submitSchedule = function(schedule){
    Schedule.postNewSchedule(schedule)
			.success(function(data, status){
        console.log("successful POST", status);
        data.createdAt = moment(data.createdAt).format('MMMM Do, YYYY');
        // Prepend to schedules for fast UX
        $scope.$parent.schedules.unshift(data);
      });
	};
});
