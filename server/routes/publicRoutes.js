var authController = require('../controllers/authController.js');
var renderingController = require('../controllers/renderingController.js')
var passport = require('passport');

module.exports = function (app) {
	// RENDERING ROUTES
	/* GET home page. */
	app.route('/')
		.get(function(req, res) {
	  		res.render('public/index', {title: 'Schedulize'});
		});
	/* GET New User page. */
	app.route('/signup')
		.get(renderingController.getSignupPage);

	app.route('/login')
    .get(renderingController.getLoginPage)
    .post(passport.authenticate('local', { 
      successRedirect: '/user',
      failureRedirect: '/login',
      failureFlash: true }));

  app.route('/logout')
    .post(function(req, res){});
};

