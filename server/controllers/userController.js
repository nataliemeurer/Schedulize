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
      req.user = doc;
      next();
    });
  }
}