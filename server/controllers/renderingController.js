var db = require('../config/dbSchema');
var User = db.User;
var Company = db.Company;
var Schedule = db.Schedule;

module.exports = {
	getSignupPage: function(req, res){
		res.render('public/signup');
	},
	getLoginPage: function(req, res){
		res.render('public/login');
	}
};