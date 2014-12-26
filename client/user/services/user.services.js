var userApp = angular.module('userApp');

userApp
.factory('User', function($http, $q){
	var user = null;
	return {
		getUser: function(){
		  // Create a promise to be returned
		  // If we have not yet fetched our schedules..
		  if(!user) {
		    var deferred = $q.defer();
		    // Request has not been made, so make it
		    $http.get('/api/users/current').then(function(res) {
		      deferred.resolve(res.data);
		    });
		    // Add the promise to myObject
		    user = deferred.promise;
		  }
		    // Return the stored promise with the data
		    return user;
		},

		updateUserAvailability: function(user){
			return $http.put('/api/users/availability', user);
		}
	};
})
.factory('Availability', function($http, $location, $q) {
	var availability = null;
    
    return {
    	getAvailability: function(){
    	  // Create a promise to be returned
    	  // If we have not yet fetched our schedules..
    	  if(!availability) {
    	    var deferred = $q.defer();
    	    // Request has not been made, so make it
    	    $http.get('/api/users/availability').then(function(res) {
    	      deferred.resolve(res.data);
    	    });
    	    // Add the promise to myObject
    	    availability = deferred.promise;
    	  }
    	    // Return the stored promise with the data
    	    return availability;
    	}
    };
})
.factory('Schedule', function($http, $location, $q){
	var schedules = null;

	return {
		getUserSchedules: function(companyId){
		  // Create a promise to be returned
		  // If we have not yet fetched our schedules..
		  if(!schedules) {
		    var deferred = $q.defer();
		    // Request has not been made, so make it
		    $http.get('/api/schedules/' + companyId).then(function(res) {
		      deferred.resolve(res.data);
		    });
		    // Add the promise to myObject
		    schedules = deferred.promise;
		  }
		    // Return the stored promise with the data
		    return schedules;
		}
	};
});