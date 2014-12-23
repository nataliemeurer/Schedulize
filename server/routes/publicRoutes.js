var authController = require('../controllers/authController.js');
var renderingController = require('../controllers/renderingController.js')
var passport = require('passport');

module.exports = function (app) {
	// RENDERING ROUTES
	/* GET home page. */
	app.route('/')
		.get(renderingController.renderHomePage);
	/* GET New User page. */
	app.route('/signup')
		.get(renderingController.getSignupPage);

  app.route('/logout')
    .post(function(req, res){});
};

