// CREATE CONSTRUCTOR FOR EDGE PROPERTY
exports.Edge = function(from, to, capacity) {
    this.from = from;
    this.to = to;
    this.capacity = capacity;
    this.reversed = false; //used to manage residual changes
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
			this.addEdge(shiftKey, 'sink', 1);
		}
		// assign keys and edges to network
		for ( var key in employees ){ 
			var userKey = employees[key]['name'].split(' ').join('');
			// assign employees to network to be saved by their full name
			this.network[userKey] = employees[key];
			// Add edge to employees 
			this.addEdge('source', userKey, this.network[userKey]['shiftsDesired']);
		}

		//TODO: assign user edges to shifts using the addEdge function.  This functionality should be contained elsewhere
		// this.userEdgesToShifts();
	}

	//I can't find a way to attach to this.network[shiftKey] and this.network[userKey]
	//Maybe put all this.network[shiftKey] 's into it's own object?
	//Maybe put all this.network[userKey] 's into it's own object?
	this.userEdgesToShifts = function() {
		for ( var key in employees ) {
			employees[key][edges][userKey]
		}
	};

	this.addEdge = function(from, to, capacity){
		var newEdge = new exports.Edge(from, to, capacity);
		// Push edge to edges array in from and to
		this.network[from]['edges'].push(newEdge);
		this.network[to]['edges'].push(newEdge);
	};

	this.removeSameDayShifts = function(){

	};

	this.addFlowToPath = function(path){
		// add one unit of flow to each item in the path
		// for Forward edges, add one flow
		// for Reverse edges, remove one flow 
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
			if( edges[i].from === currentNodeKey && (edges[i].capacity - edges[i].flow) > 0 ){
				forwardEdges.push(edges[i]);
			}
			if( edges[i].to === currentNodeKey && (edges[i].flow) > 0 ){
				backwardEdges.push(edges[i]);
			}
		}

		// test if we have an augmenting path forward from here
		if(forwardEdges.length){
			for(var i = 0; i < forwardEdges.length; i++){
				//This algorithm implements breadth first search to find a path
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
				//This algorithm implements breadth first search to find a path
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
