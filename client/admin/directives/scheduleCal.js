// 'use strict';
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
      // Create a select Function to handle adding availability to the calendar
      properties.defaultDate = moment(1396310400000).utc();
      properties.header = {left: '', right: ''};
      properties.timezone = 'UTC';
      properties.defaultView = 'agendaWeek';
      properties.columnFormat = {week: 'dddd'};
      properties.allDaySlot = false;
      // properties.eventStartEditable = true;
      properties.selectHelper = true;
      properties.overlap = false;
      properties.firstHour = 6;
      properties.unselectAuto = false;
      if(scope.editableSchedule){
        properties.editable = true;
        properties.eventDurationEditable = true;
        properties.selectable = true;
      } else {
        properties.editable = false;
        properties.eventDurationEditable = false;
        properties.selectable = false;
      }
      // properties.events = scope.activeCalendar.shifts;
      // CREATE AND STORE EVENTS
      properties.select = function(start, end) {
        var eventIdx = properties.events.length;
        if(scope.scheduleRole){
          var eventData;
          eventData = {
            title: scope.scheduleRole.name,
            start: start,
            end: end,
            color: scope.scheduleRole.color,
            borderColor: scope.scheduleRole.color,
            textColor: 'rgba(255, 255, 255, 0.87)',
            storageKey: eventIdx,
            shiftType: scope.scheduleRole.name,
            assignedTo: null
          };
          eventIdx++;
          $('#scheduleCal').fullCalendar('renderEvent', eventData, false); // stick? = true
          $('#scheduleCal').fullCalendar('unselect');
          scope.$apply(function(){
            scope.activeSchedule.shifts.push(eventData);
            scope.changed = true;
          });
        } else {
          return;
        }
      };
      // OVERWRITE EVENT
      properties.eventResize = function(event){
        scope.$apply(function(){
          console.log(scope.activeSchedule.shifts[event.storageKey]);
          scope.activeSchedule.shifts[event.storageKey] = event;
          scope.changed = true;
        });
      };

      // EVENT DRAGGING
      properties.eventDrop = function(event){
        console.log(event);
        // scope.activeSchedule.shifts[event.storageKey] = null;
        scope.activeSchedule.shifts[event.storageKey] = event;
        scope.$apply(function(){
          scope.changed = true;
        });
      };
      scope.loadEvents = function(events){
        properties.events = events;
        $('#scheduleCal').fullCalendar(properties);
      };
    }
  };
});
