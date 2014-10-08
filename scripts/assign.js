// CREATE CONSTRUCTOR FOR EDGE PROPERTY
var Edge = function(from, to, capacity) {
    this.from = from;
    this.to = to;
    this.capacity = capacity;
    this.reverseEdge = null;
    this.flow = 0;
};


// CREATE AN OBJECT THAT WILL HANDLE THE ENTIRE NETWORK
var FlowNetwork = function(users, shifts){
	// create network object to store graph
	this.network = {};
	
	// create source with no edges assigned
	this.network.source = {edges: []};
	
	// create sink with no edges assigned
	this.network.sink = {edges: []};
	
	//assign all shifts and edges to network
	this.assignEdges = function(){
		for ( var key in shifts ){
			var shiftKey = shifts[key][name].split(' ').join('');
			this.network[shiftKey] = shifts[key];
			//Add edge from shift to sink
			this.addEdge(shiftKey, 'sink', 1);
		}
		// assign keys and edges to network
		for ( var key in users ){ 
			var userKey = users[key][name].split(' ').join('');
			// assign users to network to be saved by their full name
			this.network[userKey] = users[key];
			// Add edge to users 
			this.addEdge('source', userKey, this.network[userKey][shiftsDesired]);
		}

		//TODO: assign user edges to shifts using the addEdge function.  This functionality should be contained elsewhere
	}

	this.addEdge = function(from, to, capacity){
		var newEdge = new Edge(from, to, capacity);
		newEdge.reverseEdge = new Edge(to, from, capacity);
		reverseEdge.reverseEdge = newEdge;
		// Push edge to edges array in from and to
		this.network[from].push(newEdge);
		this.network[to].push(newEdge);

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
		// if currentNode is equal to sink
		if (currentNodeKey === sink ){
			return path;
		}

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



}