'use strict';

userApp.directive('availabilityCal', function($http){
  return {
    restrict: 'A',
    template: '<div class="calendar">' +
                '<button class="btn btn-success" ng-class="{ active: preferred }" ng-click="setPreferred()"}"">Preferred</button>' +
                '<button class="btn btn-warning" ng-class="{ active: !preferred }" ng-click="setAvailable()"} "{>Available</button>' +
              '<div id="availabilityCal"></div></div>',
    replace: true,
    link: function(scope, element, attrs) {
      // Get all properties passed in from the DOM
      var properties = scope.$eval(attrs.availabilityCal);
      
      // Create a select Function to handle adding availability to the calendar
      properties.defaultDate = moment(1396310400000).utc();
      properties.header = {left: '', right: ''};
      properties.timezone = 'UTC';
      properties.defaultView = 'agendaWeek',
      properties.columnFormat = {week: 'dddd'};
      properties.select = function(start, end) {
        var eventData;
        if(scope.preferred === true){
          eventData = {
              title: 'Preferred',
              start: start,
              end: end,
              color: '#26A65B'
            };
        } else {
          eventData = {
              title: 'Available',
              start: start,
              end: end,
              color: '#F9BF3B'
            };
        }
        $('#availabilityCal').fullCalendar('renderEvent', eventData, false); // stick? = true
        $('#availabilityCal').fullCalendar('unselect');
      }

      $('#availabilityCal').fullCalendar(properties);
    }
  }
});
