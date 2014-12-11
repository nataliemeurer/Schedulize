var db = require('../database/dbSchema');
var User = db.User;
var Company = db.Company;
var Schedule = db.Schedule;

module.exports = {
	processScheduleId: function(req, res, next, code){
		Schedule.findOne({_id: code})
		    .exec(function(err, schedule){
		      if(err) {
		        console.log("Unable to process scheduleId");
		        req.status(404).send(err);
		      }
		      req.scheduleId = code;
		      req.schedule = schedule;
		      next();
		    });
	}
};