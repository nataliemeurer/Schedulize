angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  $scope.data = {};
  $scope.getLinks = function(){
    return Links.getLinks();
  };

  $scope.init = function() {
    $scope.getLinks().then(function(data){
      $scope.data.links = data.data;
    });
  };
  $scope.init();
});


