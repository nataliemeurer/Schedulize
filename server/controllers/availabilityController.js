var db = require('../config/dbSchema');
var User = db.User;

module.exports = {
	// Get availability for logged in user
	getUserAvailability: function(req, res){
		console.log("hello");
		var user = req.user;
		User.find({_id: user._id}, function(err, user){
			if(err){
				res.status(500);
			}
			res.status(200).send(user.availability);
		});
	},

	updateUserAvailability: function(req, res){
		console.log(req.body);
		User.findOne({_id: req.user._id}, function(err, user){
			if(err){
				res.status(500);
			}
			user.availability = req.body.availability;
			user.eligibleRoles = req.body.eligibleRoles;
			user.shiftsDesired = req.body.shiftsDesired;
			user.save(function(err, updatedUser){
				res.status(200).send(updatedUser);
			});
		});
	}
}