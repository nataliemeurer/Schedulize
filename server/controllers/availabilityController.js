var db = require('../config/dbSchema');
var User = db.User;

module.exports = {
	// Get availability for logged in user
	getUserAvailability: function(req, res){
		var user = req.user;
		User.find({_id: user._id}, function(err, user){
			if(err){
				res.status(500);
			}
			res.status(200).send(user.availability);
		});
	},

	updateUserAvailability: function(req, res){
		User.findOne({_id: req.user._id}, function(err, user){
			if(err){
				res.status(500);
			}
			console.log(req.body.eligibleRoles);
			user.availability = req.body.availability;
			user.eligibleRoles = req.body.eligibleRoles;
			user.shiftsDesired = req.body.shiftsDesired;
			user.save(function(err, updatedUser){
				res.status(200).send(updatedUser);
			});
		});
	}
};