angular.module('user.services', ['angularMoment'])

.factory('Availability', function($http) {
  var slots = new Array(48);
  for(var i = 0; i < 48; i++){
    slots[i] = [];
  }
  // push each time into slots
  for( var hour = 0; hour < 24; hour+=.5 ){
    for(var day = 0; day < days.length; day++){
      if(hour % 1 != 0){
        if(hour === 23.5){
          slots[hour*2].push({
            start: moment({hour: Math.floor(hour), minute: 30}),
            duration: moment.duration(30, "minutes"),
            end: moment({hour: Math.floor(hour), minute: 59}),
            day: days[day],
            available: false,
            unavailable: false
          });
        } else {
          slots[hour*2].push({
            start: moment({hour: Math.floor(hour), minute: 30}),
            duration: moment.duration(30, "minutes"),
            end: moment({hour: Math.ceil(hour), minute: 0}),
            day: days[day],
            available: false,
            unavailable: false
          });
        }
      } else {
        slots[hour*2].push({
          start: moment({hour: hour, minute: 0}),
          duration: moment.duration(30, "minutes"),
          end: moment({hour: hour, minute: 30}),
          day: days[day],
          available: false,
          unavailable: false
        });
      }
    }
  }



// 
// app('/api/:companyId/:userId/availably')
// .get(function(req, res){
//   req.params.companyId;
// });

// app('/api/:coolid/::dudeid/availably')
// 
  var shrinkAvailability = function(filledSlots) {
    var newAvailability = [];
    for ( var day = 0; day < 7; day++ ) {
      for ( var timeSlot = 0; timeSlot < filledSlots.availability.length; timeSlot++) {
        // debugger;
        if (filledSlots.availability[timeSlot][day].available) {
          var availableSlot = {};
          availableSlot.start = filledSlots.availability[timeSlot][day].start;
          var nextTimeSlot = timeSlot+1;
          while( filledSlots.availability[nextTimeSlot][day].available ) {
            nextTimeSlot ++;
          }
          availableSlot.end = filledSlots.availability[nextTimeSlot - 1][day].end;
          newAvailability.push(availableSlot);
          timeSlot = nextTimeSlot;
        }
      }
    }
    filledSlots.availability = newAvailability;
    return filledSlots;
  };

  var _sendAvailability = function(filledSlots){
    console.log(filledSlots);
    filledSlots = shrinkAvailability(filledSlots);
    console.log(filledSlots);
    return $http({
      method: 'POST',
      url: '/api/users/availability',
      data: JSON.stringify(filledSlots)
    })
    .success(function(data, status, headers, config){
      console.log('Successfully posted');
    })
    .error(function(data, status, headers, config) {
      console.log('fail silently');
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
