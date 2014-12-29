'use strict';
var adminApp = angular.module('adminApp');

adminApp
.controller('scheduleManagerCtrl', function($scope, $http, $location, Company, Schedule){