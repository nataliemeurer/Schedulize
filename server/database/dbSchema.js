//DATABASE DECLARATIONS
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/schedulize');
var db = mongoose.connection;
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

db.on('error', console.error.bind(console, 'connection error:'));
// Create Schema for our three collections
db.once('open', function callback () {
	console.log("Connected to database");
	var _userSchema = new Schema({
		name: String,
		companies: [{type: ObjectId, ref: 'Company'}],
		shiftsDesired: Number,
		shiftsAssigned: Number,
		availability: {},
		isAdmin: Boolean,
		joinDate: { type: Date, default: Date.now }
	});

	var _companySchema = new Schema({
		name: String,
		employees: [{type: ObjectId, ref: 'User'}],
		admins: [{type: ObjectId, ref: 'User'}],
		schedules: [{type: ObjectId, ref: 'Schedule'}],
		employeePassword: String
	});

	var _scheduleSchema = new Schema({
		name: String,
		Shifts: [{}],
		createdBy: String,
		createdAt: { type: Date, default: Date.now },
		active: Boolean
	});

	module.exports = {
		userSchema: _userSchema,
		companySchema: _companySchema,
		scheduleSchema: _scheduleSchema
	}
});