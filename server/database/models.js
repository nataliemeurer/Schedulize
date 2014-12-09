var db = require('dbSchema.js');

var _User = mongoose.model('User', db.userSchema);

var _Company = mongoose.model('Company', db.companySchema);

var _Schedule = mongoose.model('Schedule', db.scheduleSchema);

module.exports = {
	User: _User,
	Company: _Company,
	Schedule: _Schedule
}