'use strict';

var userApp = angular.module('userApp');

userApp.directive("checkboxGroup", function() {
  return {
    restrict: "A",
      link: function(scope, elem, attrs) {
        // Determine initial checked boxes
        if (scope.roles.indexOf(scope.userRoles) !== -1) {
            elem[0].checked = true;
        }
        // Update array on click
        elem.bind('click', function() {
          var index = scope.userRoles.indexOf(scope.userRoles);
          // Add if checked
          if (elem[0].checked) {
            if (index === -1) {
              scope.userRoles.push(scope.userRoles);
            }
          } else {
            if (index !== -1) {
              scope.userRoles.splice(index, 1);
            }
          }
        );
      });
    }
  }
});