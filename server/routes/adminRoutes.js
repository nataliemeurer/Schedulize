var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/schedulize');
var companies = db.get('companies');
var users = db.get('users');
var authController = require('../controllers/authController');

module.exports = function (app) {
	// RENDERING ROUTES
	app.get('/', authController.isLoggedInAdmin, function(req, res) {
	  res.render('admin/adminIndex', {title: 'Administrator Page', username: "Kevin Meurer, Director of All Things Ever"});
	});
};
