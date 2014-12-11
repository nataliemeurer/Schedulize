var db = require('../database/dbSchema');
var User = db.User;
var Company = db.Company;
var Schedule = db.Schedule;

module.exports = {
	processUserId: function(req, res, next, code){
		User.findOne({_id: code})
    .exec(function(err, user){
      if(err) {
        console.log("Unable to process userId");
        req.status(404).send(err);
      }
      req.userId = code;
      req.user = user;
      next();
    });
  },

  createNewUser: function(req, res){
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      companies: req.body.companies || [],
      shiftsDesired: null,
      shiftsAssigned: 0,
      availability: null,
      isAdmin: req.body.isAdmin || false,
      joinDate: req.body.joinDate || new Date()
    });

    newUser.save(function(err, user){
      if(err){
        res.status(500).send(err);
      }
      res.status(201).send(user);
    })
  }
}