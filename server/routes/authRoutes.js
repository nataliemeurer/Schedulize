var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/schedulize');
var companies = db.get('companies');
var users = db.get('users');
var bcrypt = require('bcrypt');

module.exports = function (app) {
  app.post('/signup', function(req, res){
    console.log('signing you up!');
    var name = req.body.name;
    var username = req.body.usrname;
    var email = req.body.email;
    var password = req.body.password;
    var company = req.body.company;
    var admin = req.body.admin;

    bcrypt.hash(password, 8, function(err, hash){
      users.insert({ name: name,
                     email: email,
                     password: hash,
                     company: company,
                     admin: admin, availability: [],
                     shiftsDesired: null,
                     canManage: null
                   }, function (err, doc) {
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

  app.post('/signin', function(req, res){

  });
};
