angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  $scope.link = {};

  $scope.addLink = function(){
    //console.log("OOOOOGAAA BOOGGAAA", Links);
    Links.sendLink($scope.link);
  };
});
