var userApp = angular.module('userApp', [
  'ui.router',
  // 'user.services'
  'angularMoment'
]);

console.log("executing");
userApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: "partials/user/dashboard.html"
    })
    .state('userprofile', {
      url: "/profile",
      templateUrl: "partials/user/userprofile.html"
    })
    .state('setavailability', {
      url: "/availability",
      templateUrl: "partials/user/availability.html"
    });
  
  $urlRouterProvider.otherwise("/user");
})
.controller('availabilityController', function($scope, $location, timeSlot){
  
});
// .factory('AttachTokens', function ($window) {
//   // this is an $httpInterceptor
//   // its job is to stop all out going request
//   // then look in local storage and find the user's token
//   // then add it to the header so the server can validate the request
//   var attach = {
//     request: function (object) {
//       var jwt = $window.localStorage.getItem('com.shortly');
//       if (jwt) {
//         object.headers['x-access-token'] = jwt;
//       }
//       object.headers['Allow-Control-Allow-Origin'] = '*';
//       return object;
//     }
//   };
//   return attach;
// });
// .run(function ($rootScope, $location, Auth) {
//   // here inside the run phase of angular, our services and controllers
//   // have just been registered and our app is ready
//   // however, we want to make sure the user is authorized
//   // we listen for when angular is trying to change routes
//   // when it does change routes, we then look for the token in localstorage
//   // and send that token to the server to see if it is a real user or hasn't expired
//   // if it's not valid, we then redirect back to signin/signup
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
//       $location.path('/signin');
//     }
//   });
// });
