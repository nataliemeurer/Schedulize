var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/schedulize');
var companies = db.get('companies');
var users = db.get('users');

router.get('companies/:companyId/users', function(req, res){

});

router.post('/signup', function(req, res){
	var name = req.name;
	var email = req.email;
	var password = req.password;
	var company = req.company;
	users.insert({ a: 'b' }, function (err, doc) {
  	if (err) {throw err};
	});

});

router.post('/signin', function(req, res){

});

router.post('/users/:userId/availability');

router.get('/companies/:companyId/')

router.get('/:companyId/:userId', function(req, res) {
  res.render('admin/adminIndex', {title: 'Administrator Page', username: "Kevin Meurer, Director of All Things Ever"});
});


module.exports = router;
