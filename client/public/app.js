angular.module('publicApp', [
  'user.services',
  'ui.router',
  'angularMoment'
  ])
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
});