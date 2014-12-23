var authController = require('../controllers/authController');
var renderingController = require('../controllers/renderingController');
var passport = require('passport');

module.exports = function (app) {
  app.route('/signup/employee')
    .post(authController.createNewEmployee);

  app.route('/signup/company')
    .post(authController.createNewCompany);

  app.route('/login')
    .get(renderingController.getLoginPage)
    .post(passport.authenticate('local', { 
      successRedirect: '/user',
      failureRedirect: '/login'})
    );
};
