var express = require('express');

module.exports = function (app) {
	app.get('/', function(req, res) {
  		res.render('user/userIndex', {username: "Kevin Meurer, Vital Vittles", title: "User Access"});
	});
};

