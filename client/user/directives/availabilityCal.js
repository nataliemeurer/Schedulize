'use strict';

var userApp = angular.module('userApp');

userApp.directive('availabilityCal', function($http){
  return {
    restrict: 'A',
    template: '<div class="calendar">' +
                '<div class="cal-toolbar">' +
                  '<button type="button" class="btn btn-default btn-raised" ng-class="{ \'btn-green\': preferred }" ng-click="setPreferred()">Preferred</button>' +
                  '<button type="button" class="btn btn-default btn-raised" ng-class="{ \'btn-yellow\': !preferred }" ng-click="setAvailable()">Available</button>' +
                '</div>' +
              '<div id="availabilityCal"></div></div>',
    replace: true,
    link: function(scope, element, attrs) {
      // Get all properties passed in from the DOM
      var properties = scope.$eval(attrs.availabilityCal);
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
        $('#availabilityCal').fullCalendar('renderEvent', eventData, false); // stick? = true
        $('#availabilityCal').fullCalendar('unselect');
      };
      // OVERWRITE EVENT
      properties.eventResize = function(event){
        scope.events[event.storageKey] = event;
      };
      // EVENT DRAGGING
      properties.eventDrop = function(event){
        scope.events[event.storageKey] = event;
      };

      $('#availabilityCal').fullCalendar(properties);
    }
  };
});
