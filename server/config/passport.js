var LocalStrategy = require('passport-local').Strategy;
var db = require('./dbSchema');

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    db.User.find(id).complete(function(error, user) {
      if (error)
        done(error);

      done(null, user);
    });
  });

};
