var express = require('express');
var authController = require('../controllers/authController');

module.exports = function (app) {
	// RENDERING ROUTES
	app.route('/')
		.get(authController.isLoggedInUser, function(req, res) {
  			res.render('user/userIndex', {username: "Kevin Meurer, Vital Vittles", title: "User Access"});
		});
};

