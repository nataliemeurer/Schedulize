var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/schedulize');
var companies = db.get('companies');
var users = db.get('users');


module.exports = function (app) {
	/* GET home page. */
	app.get('/', function(req, res) {
	  res.render('public/index', {title: 'Schedulize'});
	});

	/* GET New User page. */
	app.get('/signup', function(req, res) {
	  res.render('public/newuser', { title: 'Sign Up for Schedulize' });
	});

	app.get('/signin', function(req, res){

	})

	app.post('/signin', function(req, res){

	});

};

