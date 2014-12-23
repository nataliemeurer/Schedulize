var db = require('../config/dbSchema');
var User = db.User;

module.exports = {
	// Get availability for logged in user
	getUserAvailability: function(req, res){
		console.log("hello");
		var user = req.user;
		console.log(user);
		User.find({_id: user._id}, function(err, user){
			if(err){

				res.status(500);
			}
			res.status(200).send(user.availability);
		});
	}
}