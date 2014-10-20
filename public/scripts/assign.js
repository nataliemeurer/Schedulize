//note: this file is not in use.  It is a mirror of the angular admin.services factory for convenience
var moment = require('../../node_modules/moment/min/moment.min.js');
moment().format();

// CREATE CONSTRUCTOR FOR EDGE PROPERTY
exports.Edge = function(from, to, capacity) {
    this.from = from;
    this.to = to;
    this.capacity = capacity;
    this.forward = null; //used to manage residual changes
    this.flow = 0;
};


// CREATE AN OBJECT THAT WILL HANDLE THE ENTIRE NETWORK
exports.FlowNetwork = function(employees, shifts){
	// create network object to store graph
	this.network = {};
	
	// create source with no edges assigned
	this.network.source = {edges: []};
	
	// create sink with no edges assigned
	this.network.sink = {edges: []};

	//assign all shifts and edges to network
	this.assignEdges = function(){
		for ( var key in shifts ){
			var shiftKey = shifts[key]['name'].split('/').join('');
			// assign employees to network to be saved by their time shift
			this.network[shiftKey] = shifts[key];
			//Add edge from shift to sink
			this.network[shiftKey]['edges'] = [];
			this.addEdge(shiftKey, 'sink', 1);
		}
		// assign keys and edges to network
		for ( var key in employees ){ 
			var userKey = employees[key]['name'].split(' ').join('');
			// assign employees to network to be saved by their full name
			this.network[userKey] = employees[key];
			// Add edge to employees 
			this.network[userKey]['edges'] = [];
			this.addEdge('source', userKey, this.network[userKey]['shiftsDesired']);
		}

		// Add all edges between each user and shifts
		for( var key in employees ){
			this.addEmployeeEdges(employees[key], shifts);
		}
		// TODO: assign user edges to shifts using the addEdge function.  This functionality should be contained elsewhere
		// this.userEdgesToShifts();
	}

	this.addEmployeeEdges = function(employee, shifts) {
		// users have an array of objects saved as their availability, each obj has a start, end, and a duration(all moment.js objects)
		var userKey = employee['name'].split(' ').join('');
		// iterate through the shifts and compare
		for ( var key in shifts ){
			var currentShift = shifts[key];
			var shiftKey = shifts[key]['name'].split('/').join('');
			var shiftTime = currentShift.time;
			for( var i = 0 ; i < employee.availability.length; i++ ){
				var currentWindow = employee.availability[i];
				console.log(currentWindow['start'])
				if (currentWindow['start'].isSame(shiftTime['start'], 'day')){
					if ((currentWindow['start'].isSame(shiftTime['start'], 'hour', 'minute', 'day') || currentWindow['start'].isBefore(shiftTime['start'], 'hour', 'minute')) && (currentWindow['start'].isSame(shiftTime['start'], 'hour', 'minute', 'day') || currentWindow['end'].isAfter(shiftTime['start'], 'hour', 'minute'))){
						console.log('SHIFT KEY IS: ',shiftKey);
						this.addEdge( userKey, shiftKey, 1);
					}
				}
			}
		}
	};

	this.addEdge = function(from, to, capacity){
		var newEdge = new exports.Edge(from, to, capacity);
		// Push edge to edges array in from and to
		this.network[from]['edges'].push(newEdge);
		this.network[to]['edges'].push(newEdge);
	};

	// Remove all shifts on the same day.  Used if the admin elects to not use same-day. It is time intensive
	this.removeSameDayShifts = function(){
	};

	this.addFlowToPath = function(path){
		// add one unit of flow to each item in the path
		for(var i = 0; i < path.length; i++){
			//if it's a forward edge, add to the path, else subtract from the edge
			if(path[i].forward === true){
				path[i].forward = null;
				path[i].flow++;
			} else {
				path[i].forward = null;
				path[i].flow--;
			}
		}
	}

	//recursive function used to find a path through the graph
	this.findPath = function(currentNodeKey, sink, path){
		// if currentNode is equal to sink, we have a complete path from the source to the sink
		if ( currentNodeKey === sink ){
			return path;
		}
		//assign to variable for convenience and clarity
		var currentNode = this.network[currentNodeKey];
		
		//collect all potential paths forward/backward to the sink
		var forwardEdges = [];
		var backwardEdges = [];
		for( var i = 0; i < currentNode.edges.length; i++){
			if( currentNode.edges[i].from === currentNodeKey && (currentNode.edges[i].capacity - currentNode.edges[i].flow) > 0 ){
				forwardEdges.push(currentNode.edges[i]);
			}
			if( currentNode.edges[i].to === currentNodeKey && (currentNode.edges[i].flow) > 0 ){
				backwardEdges.push(currentNode.edges[i]);
			}
		}

		// test if we have an augmenting path forward from here
		if(forwardEdges.length){
			for(var i = 0; i < forwardEdges.length; i++){
				// search for a path
				forwardEdges[i]['forward'] = true;
				path.push(forwardEdges[i]);
				var result = this.findPath(forwardEdges[i].to, 'sink', path);
				if(result){
					return result;
				}
			}
		}
		// test if we have an augmenting path backward through the residual from here
		if(backwardEdges.length){
			for(var i = 0; i < backwardEdges.length; i++){
				// search for a path
				backwardEdges[i]['forward'] = false;
				path.push(backwardEdges[i]);
				path[path.length - 1].reversed = true;
				var result = this.findPath(backwardEdges[i].to, 'sink', path);
				if(result){
					return result;
				}
			}
		}
		// return null if no paths are found
		return null;
	}

	// main function used to find the flow in the network
	this.findMaxFlow = function(){
		// Path variable used to store the current path
		var path = this.findPath('source', 'sink', []);
		
		// while an augmenting path still exists
		while( path != null ){
			// we add flow to the path one at a time using our this.addFlowToPath function
			this.addFlowToPath(path);
			path = this.findPath('source', 'sink', []);
		}

		var shiftsAssigned = 0;
		for ( var i = 0; i < this.network.source.edges.length; i++ ){
			shiftsAssigned += this.network.source.edges[i].flow;
		}
		// assign shiftsAssigned variable to network for later reference
		this.network['shiftsAssigned'] = shiftsAssigned;

		// return the Filled network, which we will use to determine to whom shifts were assigned
		return this.network;
	}
	
	// this function will do the actual assigning of shifts by managing the network results
	this.parseFlowResults = function(network){

	}
};
