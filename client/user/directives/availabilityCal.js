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
      properties.slotDuration = '00:15:00';
      properties.allDaySlot = false;
      properties.eventStartEditable = true;
      properties.selectHelper = true;
      properties.overlap = false;
      
      properties.eventRender = function(event, element) {
        element.append( "<button class='closon btn mdi-content-clear'></button>" );
        element.css("z-index", "1");
        element.find(".closon").css("z-index", "2");
        element.find(".closon").click(function(){
          scope.$apply(function(){
            console.log(event.storageKey);
            scope.availability[event.storageKey] = null;
            for(var i = event.storageKey + 1; i < scope.availability.length; i++){
              scope.availability[i - 1] = scope.availability[i];
              scope.availability[i - 1].storageKey = i - 1;
            }
            scope.availability.length
            scope.availability.pop();
            console.log(scope.availability);
            scope.changed = true;

          })
          $('#availabilityCal').fullCalendar( 'removeEvents' );
          $('#availabilityCal').fullCalendar( 'addEventSource', scope.availability );
          console.log("updated that shit");
        });
      }
      
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
        scope.$apply(function(){
          scope.availability.push(eventData);
          scope.changed = true;
          $('#availabilityCal').fullCalendar('renderEvent', eventData, false); // stick? = true
          $('#availabilityCal').fullCalendar('unselect');
        });
      };
      // OVERWRITE EVENT
      properties.eventResizeStop = function(event){
        scope.$apply(function(){
          scope.availability[event.storageKey] = event;
          scope.changed = true;
          console.log(scope.availability);
        });
      };
      // EVENT DRAGGING
      properties.eventDrop = function(event){
        console.log(event);
        scope.$apply(function(){
          scope.availability[event.storageKey] = event;
          scope.changed = true;
          console.log(scope.availability);
        });
      };

      scope.loadEvents = function(){
        for(var i = 0; i < scope.availability.length; i++){
          scope.availability[i]._id = null; // remove fc _id property which ruins everything.
          scope.availability[i].source = null; // remove source property which ruins everything
        }
        properties.events = scope.availability;
        $('#availabilityCal').fullCalendar(properties);
      };
    }
  };
});
