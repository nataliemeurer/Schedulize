var authController = require('../controllers/authController.js');

module.exports = function (app) {
	// RENDERING ROUTES
	/* GET home page. */
	app.route('/')
		.get(function(req, res) {
	  		res.render('public/index', {title: 'Schedulize'});
		});
	/* GET New User page. */
	app.route('/signup')
		.get(function(req, res) {
	  		res.render('public/newuser', { title: 'Sign Up for Schedulize' });
		  });

	app.route('/signin')
    .get(function(req, res){})
    .post(function(req, res){});

  app.route('/logout')
    .post(function(req, res){});
};

