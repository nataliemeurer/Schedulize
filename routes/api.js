var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/schedulize');
var companies = db.get('companies');
var users = db.get('users');
var bcrypt = require('bcrypt');




router.post('/signup', function(req, res){
	console.log('signing you up!');
	var name = req.body.name;
	var username = req.body.usrname;
	var email = req.body.email;
	var password = req.body.password;
	var company = req.body.company;
	var admin = req.body.admin;

  bcrypt.hash(password, 8, function(err, hash){
		users.insert({ name: name, email: email, password: hash, company: company, admin: admin, availability: [], shiftsDesired: null, canManage: null}, function (err, doc) {
  		if (err) {throw err};
  		req.session.regenerate(function(){
        req.session.name = name;
        req.session.company = company;
        res.redirect('/user');
        res.send(200);
      });
		});
	});
});

router.param('companyId', function(req, res, next, code){

});

router.param('userId', function(req, res, next, code){
	users.findOne({_id: code}).on('success', function(doc){
      req.user = doc;
      next();
	})
});



router.post('/signin', function(req, res){

});

router.get('/companies/:companyId/', function(req, res){

});


router.get('companies/:companyId/users', function(req, res){

});

router.get('/users', function(req, res){
	users.find({}).on('success', function(docs){
		res.send(200, docs);
	})
});

router.get('/users/:userId', function(req, res){
	res.send(req.user);
});

router.post('/users/:userId/availability', function(req, res){
	
});

router.post('/logout', function(req, res){
	req.session.destroy(function(){
    res.redirect('/');
  });
})


module.exports = router;
