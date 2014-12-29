var adminApp = angular.module('adminApp', [
  'admin.services',
  'ui.router',
  'ui.router.stateHelper',
  'angularMoment'
])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      // COMPANY DASHBOARD
      .state('dashboard', {
        url: "/companydashboard",
        templateUrl: "/admin/partials/dashboard.html"
      })
      // MANAGE EMPLOYEES
      .state('employeemanager', {
        url: "/employees",
        templateUrl: "/admin/partials/employeemanager.html"
      })
      // SCHEDULE MANAGER
      .state('schedulemanager', {
        templateUrl: "/admin/partials/schedulemanager.html"
      })
        // Schedule Manager Child States
        .state('schedulemanager.getstarted', {
          url: "/schedulemanager",
          templateUrl: "/admin/partials/schedulemanager.getstarted.html"
        })
        .state('schedulemanager.scheduleview', {
          url: "/schedulemanager/:scheduleId",
          templateUrl: "/admin/partials/schedulemanager.scheduleview.html"
        })
        .state('schedulemanager.newschedule', {
          url: "/schedulemanager/newschedule",
          templateUrl: "/admin/partials/schedulemanager.newschedule.html"
        })
      .state('editshifts', {
        url: "/editshifts",
        templateUrl: "/admin/partials/editshifts.html"
      });
    $urlRouterProvider.otherwise("/companydashboard");
  })
  .controller('mainController', function($scope, $state){
    $.material.init();
    $.material.checkbox();
  });