// check to be sure that desired shifts is greater than or equal to required shifts(shifts.length)
	// if yes, execute function to fill shifts


// are we accounting for days of the week as well?
var shifts = {
	"230-330/manage": {edges: ["KevinMeurer", "RileyZinar"], undesirable: false, assignedTo: null},
	"330-430/cash":  {edges: ["KevinMeurer"], undesirable: true assignedTo: null},
	"430-530/cash": {edges: ["RileyZinar"], undesirable: false, assignedTo: null}
}

var employees = {
	"KevinMeurer": { edges: ["230-330/manage", "330-430/cash"], desiredShiftNum: 2, undesirableCount: 0, shiftsTaken: 0 }
	"RileyZinar": { edges: ["230-330/manage", "430-530/cash"], desiredShiftNum: 2, undesirableCount: 0, shiftsTaken: 0 }
}


//fill shifts function
	// sort shifts by edges.length(fewest people who can work a shift)
	//include underscore
var fillShifts = function( employees, shifts ){
	_.sortBy( shifts, function(obj){ return obj.edges.length; }) //checked and it works
	// get keys of shifts using Object.keys(shifts)
	for ( var key in shifts ){
		// assign shifts
		// set currentShift
		var currentShift = shifts[key];
		

	}
}