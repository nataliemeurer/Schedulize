'use strict';
var adminApp = angular.module('adminApp');

adminApp.directive('scheduleCal', function($http){
  return {
    restrict: 'A',
    template: '<div class="calendar">' +
              '<div id="scheduleCal"></div>' +
              '</div>',
    replace: true,
    link: function(scope, element, attrs) {
      console.log("HOLA");
      // Get all properties passed in from the DOM
      var properties = scope.$eval(attrs.scheduleCal);
      var eventIdx = 0;
      // Create a select Function to handle adding availability to the calendar
      properties.defaultDate = moment(1396310400000).utc();
      properties.header = {left: '', right: ''};
      properties.timezone = 'UTC';
      properties.defaultView = 'agendaWeek';
      properties.columnFormat = {week: 'dddd'};
      properties.allDaySlot = false;
      properties.eventStartEditable = true;
      properties.selectHelper = true;
      properties.overlap = false;
      
      // CREATE AND STORE EVENTS
      properties.select = function(start, end) {
        var eventData;
        if(scope.preferred === true){
          eventData = {
              title: 'Preferred',
              start: start,
              end: end,
              color: '#4CAF50',
              borderColor: '#7CB342',
              textColor: 'rgba(0, 0, 0, 0.87)',
              storageKey: eventIdx
            };
        } else {
          eventData = {
              title: 'Available',
              start: start,
              end: end,
              color: '#FFEB3B',
              borderColor: '#FDD835',
              textColor: 'rgba(0, 0, 0, 0.87)',
              storageKey: eventIdx
            };
        }
        scope.events[eventIdx] = eventData;
        eventIdx++;
        $('#scheduleCal').fullCalendar('renderEvent', eventData, false); // stick? = true
        $('#scheduleCal').fullCalendar('unselect');
      };
      // OVERWRITE EVENT
      properties.eventResize = function(event){
        scope.events[event.storageKey] = event;
      };
      // EVENT DRAGGING
      properties.eventDrop = function(event){
        scope.events[event.storageKey] = event;
      };

      $('#scheduleCal').fullCalendar(properties);
    }
  };
});
