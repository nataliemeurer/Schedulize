angular.module('admin.services', ['angularMoment'])
.factory('Company', function($http, $q){
  var company = null;

  return {
    getCompanyData: function(){
      if(!company) {
        var deferred = $q.defer();
        // Request has not been made, so make it
        $http.get('/api/companies/current').then(function(res) {
          deferred.resolve(res.data);
        });
        // Add the promise to company
        company = deferred.promise;
      }
        // Return the stored promise with the data
        return company;
    },
  }
})
.factory('Schedule', function($http, $q){
  // For storage
  var schedules = null;
  
  return {
    getCompanySchedules: function(companyId){
      // Create a promise to be returned
      // If we have not yet fetched all our schedules..
      if(!schedules) {
        var deferred = $q.defer();
        // Request has not been made, so make it
        $http.get('/api/schedules/' + companyId).then(function(res) {
          for(var i = 0; i < res.data.length; i++){
            res.data[i].createdAt = moment(res.data[i].createdAt).format('MMMM Do, YYYY');
          }
          deferred.resolve(res.data);
        });
        // Add the promise to myObject
        schedules = deferred.promise;
      }
        // Return the stored promise with the data
        return schedules;
    },
    
    // new GET request to overwrite the prior promise
    reloadAllSchedules: function(){
      var deferred = $q.defer();
      // Request has not been made, so make it
      $http.get('/api/schedules').then(function(res) {
        for(var i = 0; i < res.data.length; i++){
          res.data[i].createdAt = moment(res.data[i].createdAt).format('MMMM Do, YYYY');
        }
        deferred.resolve(res.data);
      });
      // Add the promise to myObject
      schedules = deferred.promise;
      return schedules;
    },

    getOneSchedule: function(scheduleId){
      console.log("SCHEDULES IS: ", schedules);
      var deferred = $q.defer();
      this.getCompanySchedules().then(function(schedules){
        for(var i = 0; i < schedules.length; i++){
            if(schedules[i]._id === scheduleId){
              deferred.resolve(schedules[i]);
            }
        }
      });
      return deferred.promise;
    },

    postNewSchedule: function(schedule){
      if(schedule.template){
        schedule.shifts = schedule.templateSchedule.shifts.slice(0);
        schedule.totalShifts = schedule.templateSchedule.totalShifts;
        schedule.roles = schedule.templateSchedule.roles.slice(0);
      }
      return $http.post("/api/schedules", schedule);
    },

    updateSchedule: function(schedule){
      var deferred = $q.defer();
      for(var i = 0; i < schedule.shifts.length; i++){
        schedule.shifts[i].source = null;
      }
      $http.put("/api/schedules/schedule/" + schedule._id, schedule)
        .then(function(res){
          deferred.resolve(res.data);
        });
      return deferred.promise;
    },
    
    deleteSchedule: function(schedule){
      var deferred = $q.defer();
      $http.delete("/api/schedules/schedule/" + schedule._id)
        .then(function(res){
          console.log("resolved");
          deferred.resolve(res.data);
        });
      return deferred.promise;
    }
  };
});
// .factory('Network', function($http){
//   var _getEmployees = function($http, companyName){
//     return $http({
//         method: 'GET',
//         url: '/api/users'
//       })
//       .success(function(data, status, headers, config) {
//         return data;
//       })
//       .error(function(data, status, headers, config) {
//         console.log('fail silently');
//       });
//   };

//   var _getShifts = function($http, companyName){
//     return $http({
//         method: 'GET',
//         url: '/api/shifts'
//       })
//       .success(function(data, status, headers, config) {
//         return data;
//       })
//       .error(function(data, status, headers, config) {
//         console.log('fail silently');
//       });
//   }

//   var Edge = function(from, to, capacity) {
//       this.from = from;
//       this.to = to;
//       this.capacity = capacity;
//       this.forward = null; //used to manage residual changes
//       this.flow = 0;
//   };

//   // CREATE AN OBJECT THAT WILL HANDLE THE ENTIRE NETWORK
//   var FlowNetwork = function(employees, shifts){
//     // create network object to store graph
//     this.network = {};
    
//     // create source with no edges assigned
//     this.network.source = {edges: []};
    
//     // create sink with no edges assigned
//     this.network.sink = {edges: []};

//     //assign all shifts and edges to network
//     this.assignEdges = function(){
//       for ( var i = 0; i < shifts.length; i++ ){
//         // convert all times to moment objects
//         var shiftKey = shifts[i]._id;
//         // assign employees to network to be saved by their time shift
//         this.network[shiftKey] = shifts[i];
//         //Add edge from shift to sink
//         this.network[shiftKey]['edges'] = [];
//         this.addEdge(shiftKey, 'sink', 1);
//       }
//       // assign keys and edges to network
//       for ( var i = 0; i < employees.length; i++ ){ 
//         var userKey = employees[i]._id;
//         // assign employees to network to be saved by their full name
//         this.network[userKey] = employees[i];
//         // Add edge to employees 
//         this.network[userKey]['edges'] = [];
//         this.addEdge('source', userKey, this.network[userKey]['shiftsDesired']);
//       }

//       // Add all edges between each user and shifts
//       for( var i = 0; i < employees.length; i++ ){
//         this.addEmployeeEdges(employees[i], shifts);
//       }
      
//     }

//     this.addEmployeeEdges = function(employee, shifts) {
//         // users have an array of objects saved as their availability, each obj has a start, end, and a duration(all moment.js objects)
//         var userKey = employee._id;
//         // iterate through the shifts and compare
//         for ( var j = 0; j < shifts.length; j++ ){
//           var currentShift = shifts[j];
//           var shiftStart = convertTimeToNumber(currentShift.time.start);
//           var shiftEnd = convertTimeToNumber(currentShift.time.end);
//           var shiftKey = shifts[j]._id;
//           for( var k = 0 ; k < employee.availability.length; k++ ){
//             var currentWindow = employee.availability[k];
//             var windowStart = convertTimeToNumber(currentWindow.start);
//             var windowEnd = convertTimeToNumber(currentWindow.end);
//             var userKey = employee._id;
//             if ( currentShift.day === currentWindow.day ){
//               if ( windowStart <= shiftStart && windowEnd >= shiftEnd ){
//                 this.addEdge( userKey, shiftKey, 1 );
//               }
//             }
//           }
//         }
//       };

//     this.addEdge = function(from, to, capacity){
//       var newEdge = new Edge(from, to, capacity);
//       // Push edge to edges array in from and to
//       this.network[from]['edges'].push(newEdge);
//       this.network[to]['edges'].push(newEdge);
//     };

//     this.removeSameDayShifts = function(){

//     };

//     this.addFlowToPath = function(path){
//       // add one unit of flow to each item in the path
//       for(var i = 0; i < path.length; i++){
//         //if it's a forward edge, add to the path, else subtract from the edge
//         if(path[i].forward === true){
//           path[i].forward = null;
//           path[i].flow++;
//         } else {
//           path[i].forward = null;
//           path[i].flow--;
//         }
//       }
//       // for Forward edges, add one flow
//       // for Reverse edges, remove one flow 
//     }

//     //recursive function used to find a path through the graph
//     this.findPath = function(currentNodeKey, sink, path){
//       // if currentNode is equal to sink, we have a complete path from the source to the sink
//       if ( currentNodeKey === sink ){
//         return path;
//       }
      
//       //assign to variable for convenience and clarity
//       var currentNode = this.network[currentNodeKey];
      
//       //collect all potential paths forward/backward to the sink
//       var forwardEdges = [];
//       var backwardEdges = [];
//       for( var i = 0; i < currentNode.edges.length; i++){
//         if( currentNode.edges[i].from === currentNodeKey && (currentNode.edges[i].capacity - currentNode.edges[i].flow) > 0 ){
//           forwardEdges.push(currentNode.edges[i]);
//         }
//         if( currentNode.edges[i].to === currentNodeKey && (currentNode.edges[i].flow) > 0 ){
//           backwardEdges.push(currentNode.edges[i]);
//         }
//       }
//       // test if we have an augmenting path forward from here
//       if(forwardEdges.length){
//         for(var i = 0; i < forwardEdges.length; i++){
//           //This algorithm implements breadth first search to find a path
//           forwardEdges[i]['forward'] = true;
//           path.push(forwardEdges[i]);
//           var result = this.findPath(forwardEdges[i].to, 'sink', path);
//           if(result){
//             return result;
//           }
//         }
//       }
//       // test if we have an augmenting path backward through the residual from here
//       if(backwardEdges.length){
//         for(var i = 0; i < backwardEdges.length; i++){
//           //This algorithm implements breadth first search to find a path
//           backwardEdges[i]['forward'] = false;
//           path.push(backwardEdges[i]);
//           path[path.length - 1].reversed = true;
//           var result = this.findPath(backwardEdges[i].to, 'sink', path);
//           if(result){
//             return result;
//           }
//         }
//       }
//       // return null if no paths are found
//       return null;
//     };

//     // main function used to find the flow in the network
//     this.findMaxFlow = function(){
//       // Path variable used to store the current path
//       var path = this.findPath('source', 'sink', []);
      
//       // while an augmenting path still exists
//       while( path != null ){
//         // we add flow to the path one at a time using our this.addFlowToPath function
//         this.addFlowToPath(path);
//         path = this.findPath('source', 'sink', []);
//       }

//       var shiftsAssigned = 0;
//       for ( var i = 0; i < this.network.source.edges.length; i++ ){
//         shiftsAssigned += this.network.source.edges[i].flow;
//       }
//       // assign shiftsAssigned variable to network for later reference
//       this.network['shiftsAssigned'] = shiftsAssigned;

//       // return the Filled network, which we will use to determine to whom shifts were assigned
//       return this.network;
//     }

//     // this function will do the actual assigning of shifts by managing the network results
//     this.parseFlowResults = function(network){
//       console.log(network.shiftsAssigned);
//     }
//   };

//   var _createNetwork = function(employees, shifts){
//     var network = new FlowNetwork(employees, shifts);
//     network.assignEdges();
//     return network;
//   };

//   /* HELPER FUNCTIONS */
//   var convertTimeToNumber = function(time){
//     var number = time.hour;
//     number += (time.minute / 60);
//     return number;
//   }

//   return {
//     getShifts: _getShifts,
//     getEmployees: _getEmployees,
//     createNetwork: _createNetwork
//   };
// });