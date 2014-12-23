var userApp = angular.module('userApp');

userApp
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
.factory('Company', function($http, $location){
	var companies = null;

	return {
		getUserCompanies: function(){
		  // Create a promise to be returned
		  // If we have not yet fetched our schedules..
		  if(!companies) {
		    var deferred = $q.defer();
		    // Request has not been made, so make it
		    $http.get('/api/users/companies').then(function(res) {
		      deferred.resolve(res.data);
		    });
		    // Add the promise to myObject
		    companies = deferred.promise;
		  }
		    // Return the stored promise with the data
		    return companies;
		}
	};
});