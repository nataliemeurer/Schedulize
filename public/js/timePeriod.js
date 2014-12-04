var moment = require('../node_modules/moment/min/moment.min.js');
moment().format();

// Functional constructor to create shift objects that will pass in moments
exports.Shift = function(start, end, day){
	// we create an object that will store information about the shift
	var shiftPeriod = {};
	shiftPeriod['day'] = day;
	shiftPeriod['start'] = start;
	//if a duration was passed in, we use this
	if(end){
		shiftPeriod['end'] = end;
		end.subtract(start.hours())
		end.subtract(start.minutes(), 'minutes');
		shiftPeriod['duration'] = moment.duration({hour: end.hour() - start.hour(), minute: end.minute() - start.minute()})
	} else {
		console.log("Error creating object");
		return null;
	}
	return shiftPeriod;
}

exports.AvailabilityPeriod = function(start, end, day){
	var availabilityPeriod = {};
	availabilityPeriod['day'] = day;
	availabilityPeriod['start'] = start;
	//if a duration was passed in, we use this
	if(end){
		availabilityPeriod['end'] = end;
		end.subtract(start.hours())
		end.subtract(start.minutes(), 'minutes');
		availabilityPeriod['duration'] = moment.duration({hour: end.hour() - start.hour(), minute: end.minute() - start.minute()})
	} else {
		console.log("Error creating object");
		return null;
	}
	return availabilityPeriod;
}