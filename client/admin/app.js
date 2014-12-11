var adminApp = angular.module('adminApp', [
  'admin.services',
  'ui.router'
])
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
      .state('schedulemanager', {
        url: "/schedulemanager",
        templateUrl: "/admin/partials/schedulemanager.html"
      }).state('editshifts', {
        url: "/editshifts",
        templateUrl: "/admin/partials/editshifts.html"
      });
    $urlRouterProvider.otherwise("/companydashboard");
  })
  .controller('createScheduleController', function($scope, $http, $location){
  });