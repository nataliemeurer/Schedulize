angular.module('userApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
  .state('dashboard', {
    url: "/dashboard",
    templateUrl: "partials/dashboard.html"
  })
  .state('userprofile', {
    url: "/profile",
    templateUrl: "/user/partials/userprofile.html"
  })
  .state('submitted', {
    url: "/submitted",
    templateUrl: "/user/partials/submitted.html"
  })
  .state('availability', {
    url: "/availability",
    templateUrl: "/user/partials/availability.html"
  });

  $urlRouterProvider.otherwise("/dashboard");
})
.controller('mainController', function($scope, $state){
  $.material.init();
  $.material.checkbox();
});