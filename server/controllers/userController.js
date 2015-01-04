var db = require('../config/dbSchema');
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
      next();
    });
  },

  getCurrentUser: function(req, res){
    var user = req.user;
    User
    .findOne({_id: user._id}, "name email shiftsDesired shiftsAssigned eligibleRoles isAdmin availability companies")
    .populate('companies')
    .exec(function (err, user) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(user);
    });
  },

  toggleAdmin: function(req, res){
    var code = req.userId;
    User
    .findOne({_id: code})
    .exec(function(err, user){
      if (err) {
        res.status(500).send(err);
      }
      user.isAdmin = user.isAdmin ? false : true;
      user.save(function(err, updatedUser){
        res.status(200).send(updatedUser);
      });
    });
  }
};