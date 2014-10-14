var adminApp = angular.module('adminApp', [
  // 'admin.services',
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
  .controller('createScheduleController', function($scope, $location){

  });