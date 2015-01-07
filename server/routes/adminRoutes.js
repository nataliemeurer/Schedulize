var authController = require('../controllers/authController');

module.exports = function (app) {
	// RENDERING ROUTES
	app.get('/', authController.isLoggedInAdmin, function(req, res) {
	  res.render('admin/adminIndex', {title: 'Administrator Page', username: "Kevin Meurer, Director of All Things Ever"});
	});
};
