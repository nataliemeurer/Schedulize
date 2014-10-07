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

	this.addEdge = function(from, to, capacity){
		var newEdge = new Edge(from, to, capacity);
		newEdge.reverseEdge = new Edge(to, from, capacity);
		reverseEdge.reverseEdge = newEdge;
		// Push edge to edges array in from and to
		this.network[from].push(newEdge);
		this.network[to].push(newEdge);

	}



}