// 'use strict';
var adminApp = angular.module('adminApp');

adminApp.directive('availabilityCalStatic', function($http){
  return {
    restrict: 'A',
    template: '<div class="calendar">' +
              '<div id="availabilityCalStatic"></div>' +
              '</div>',
    replace: true,
    link: function(scope, element, attrs) {
      // Get all properties passed in from the DOM
      var properties = scope.$eval(attrs.availabilityCalStatic);
      // Create a select Function to handle adding availability to the calendar
      properties.defaultDate = moment(1396310400000).utc();
      properties.header = {left: '', right: ''};
      properties.timezone = 'UTC';
      properties.defaultView = 'agendaWeek';
      properties.columnFormat = {week: 'dddd'};
      properties.allDaySlot = false;
      properties.selectHelper = true;
      properties.overlap = false;
      properties.firstHour = 6;
      properties.unselectAuto = false;
      properties.editable = false;
      properties.eventDurationEditable = false;
      properties.selectable = false;

      // LOAD SHIFTS AFTER PAGE HAS LOADED
      scope.loadEvents = function(){
        var availability = scope.employee.availability;
        properties.events = availability;
        $('#availabilityCalStatic').fullCalendar(properties);
      };
    }
  };
});
