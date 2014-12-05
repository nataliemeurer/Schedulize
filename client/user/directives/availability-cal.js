angular.module('app.directives.availabilityCal', [])
  .directive('availabilityCal', function($http){
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      // Get all properties passed in from the DOM
      var properties = scope.$eval(attrs.availabilityCal);
      
      // Create a select Function to handle adding availability to the calendar
      properties['select'] = function(start, end) {
        var eventData;
        scope.preferred = true;
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
        $(element).fullCalendar('renderEvent', eventData, false); // stick? = true
        $(element).fullCalendar('unselect');
      }

      $(element).fullCalendar(properties);
    }
  }
});
