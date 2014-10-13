var moment = require('../node_modules/moment/min/moment.min.js');
moment().format();

// Functional constructor to create shift objects that will pass in moments
exports.Shift = function(start, duration, end, day){
	// we create an object that will store information about the shift
	var shiftPeriod = {};
	shiftPeriod['start'] = start;
	//if a duration was passed in, we use this
	if(duration){
		shiftPeriod['duration'] = duration;
		start.add(duration.hours(), 'hours');
		start.add(duration.minutes(), 'minutes');
		shiftPeriod['end'] = start;
	} else if(end){
		shiftPeriod['end'] = end;
		start.hours()
		end.subtract(start.minutes(), 'minutes');
		shiftPeriod['duration'] = moment({})
	} else {
		console.log("Error creating object");
		return null;
	}
	return shiftPeriod;
}

exports.AvailabilityPeriod = function(start, duration, end){
	start = start.split(':');

}