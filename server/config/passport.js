var LocalStrategy = require('passport-local').Strategy;
var db = require('./dbSchema');
var User = db.User;

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findOne({_id: id}, function(error, user) {
      if (error){
        done(error);
      }
      done(null, user);
    });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
};
