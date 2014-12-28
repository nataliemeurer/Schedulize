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
        var eventIdx = scope.availability.length;
        // create different events based on mode
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
        console.log(scope.availability);
        scope.$apply(function(){
          scope.availability.push(eventData);
          scope.changed = true;
          $('#availabilityCal').fullCalendar('renderEvent', eventData, false); // stick? = true
          $('#availabilityCal').fullCalendar('unselect');
        });
      };
      // OVERWRITE EVENT
      properties.eventResize = function(event){
        event.source = null; // remove source property which ruins everything
        scope.$apply(function(){
          scope.availability[event.storageKey] = event;
          scope.changed = true;
        });
      };
      // EVENT DRAGGING
      properties.eventDrop = function(event){
        event.source = null; // remove source property which ruins everything
        scope.$apply(function(){
          scope.availability[event.storageKey] = event;
          scope.changed = true;
        });
      };

      scope.loadEvents = function(){
        var availability = scope.availability;
        for(var i = 0; i < availability.length; i++){
          availability[i]._id = null; // remove fc _id property which ruins everything.
          availability[i].source = null; // remove source property which ruins everything
        }
        properties.events = availability;
        $('#availabilityCal').fullCalendar(properties);
      };
    }
  };
});
