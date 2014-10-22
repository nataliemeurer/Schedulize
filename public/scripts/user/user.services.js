angular.module('user.services', ['angularMoment'])

.factory('Availability', function($http, $location) {
  
  // Create empty slots in which to store our availability
  var slots = new Array(48);
  for(var i = 0; i < 48; i++){
    slots[i] = [];
  }
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wedneday', 'Thursday', 'Friday', 'Saturday'];
  // push each time into slots
  for( var hour = 0; hour < 24; hour+=.5 ){
    for(var day = 0; day < days.length; day++){
      if(hour % 1 != 0){
        if(hour === 23.5){
          slots[hour*2].push({
            start: moment({hour: Math.floor(hour), minute: 30}).day(days[day]),
            end: moment({hour: Math.floor(hour), minute: 59}).day(days[day]),
            day: days[day],
            available: false,
            tentative: false
          });
        } else {
          slots[hour*2].push({
            start: moment({hour: Math.floor(hour), minute: 30}).day(days[day]),
            end: moment({hour: Math.ceil(hour), minute: 0}).day(days[day]),
            day: days[day],
            available: false,
            tentative: false
          });
        }
      } else {
        slots[hour*2].push({
          start: moment({hour: hour, minute: 0}).day(days[day]),
          end: moment({hour: hour, minute: 30}).day(days[day]),
          day: days[day],
          available: false,
          tentative: false
        });
      }
    }
  }

  // shrinkAvailability does preprocessing work before shifts are sent to the server, creating blocks of availability
  var shrinkAvailability = function(filledSlots) {
    var newAvailability = [];
    for ( var day = 0; day < 7; day++ ) {
      for ( var timeSlot = 0; timeSlot < filledSlots.availability.length; timeSlot++) {
        if (filledSlots.availability[timeSlot][day].available) {
          var availableSlot = {};
          availableSlot.start = filledSlots.availability[timeSlot][day].start;
          var nextTimeSlot = timeSlot+1;
          while( filledSlots.availability[nextTimeSlot][day].available ) {
            nextTimeSlot ++;
          }
          availableSlot.end = filledSlots.availability[nextTimeSlot - 1][day].end;
          availableSlot.day = filledSlots.availability[nextTimeSlot - 1][day].day;
          newAvailability.push(availableSlot);
          timeSlot = nextTimeSlot;
        }
      }
    }
    filledSlots.availability = newAvailability;
    return filledSlots;
  };

  // sends availability to the server, which will store it under the user's name
  var _sendAvailability = function(filledSlots){
    filledSlots = shrinkAvailability(filledSlots);
    //get rid of moment object-ness, necessary to avoid time change issues
    for( var i = 0; i < filledSlots.availability.length; i++ ){
      var currentItem = filledSlots['availability'][i];
      console.log(currentItem.day);
      filledSlots['availability'][i] = {
        start: {hour: currentItem.start.hour(), minute: currentItem.start.minute()},
        end: { hour: currentItem.end.hour(), minute: currentItem.end.minute() },
        day: currentItem.day
      }
    }

    filledSlots.shiftsDesired = parseInt(filledSlots.shiftsDesired);
    if(filledSlots.canManage === 'true'){
      filledSlots.canManage = true;
    } else {
      filledSlots.canManage = false;
    }
    console.log(filledSlots);
    return $http({
      method: 'POST',
      url: '/api/users/availability',
      data: JSON.stringify(filledSlots),
      contentType: 'application/json'
    })
    .success(function(data, status, headers, config){
      console.log('Successfully posted');
    })
    .error(function(data, status, headers, config) {
      console.log('Failed to Post to the Server')
    });
  };

  return {
    slots: slots,
    sendAvailability: _sendAvailability
  };
});


// .factory('Links', function ($http) {
//   // Your code here
//   var _sendLink = function(link){
//     return $http({
//       method: 'POST',
//       url: '/api/links',
//       data: link
//     })
//     .success(function(data, status, headers, config) {
//       console.log("WOOHOO");
//     })
//     .error(function(data, status, headers, config) {
//       console.log('fail silently');
//     });
//   }

//   var _getLinks = function(){
//     return $http({
//       method: 'GET',
//       url: '/api/links'
//     })
//     .success(function(data, status, headers, config) {
//       return data;
//     })
//     .error(function(data, status, headers, config) {
//       console.log('fail silently');
//     });
//   }
//   return {
//     sendLink: _sendLink,
//     getLinks: _getLinks
//   }
// })
// .factory('Auth', function ($http, $location, $window) {
//   // Don't touch this Auth service!!!
//   // it is responsible for authenticating our user
//   // by exchanging the user's username and password
//   // for a JWT from the server
//   // that JWT is then stored in localStorage as 'com.shortly'
//   // after you signin/signup open devtools, click resources,
//   // then localStorage and you'll see your token from the server
//   var signin = function (user) {
//     return $http({
//       method: 'POST',
//       url: '/api/users/signin',
//       data: user
//     })
//     .then(function (resp) {
//       return resp.data.token;
//     });
//   };

//   var signup = function (user) {
//     return $http({
//       method: 'POST',
//       url: '/api/users/signup',
//       data: user
//     })
//     .then(function (resp) {
//       return resp.data.token;
//     });
//   };

//   var isAuth = function () {
//     return !!$window.localStorage.getItem('com.shortly');
//   };

//   var signout = function () {
//     $window.localStorage.removeItem('com.shortly');
//     $location.path('/signin');
//   };


//   return {
//     signin: signin,
//     signup: signup,
//     isAuth: isAuth,
//     signout: signout
//   };
// });
