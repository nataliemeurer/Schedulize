var db = require('../config/dbSchema');
var User = db.User;
var Company = db.Company;
var Schedule = db.Schedule;

module.exports = {
  renderHomePage: function(req, res){
    if(req.isAuthenticated()){
    	res.render('public/index', {title: 'Schedulize', user: req.user, loggedIn: true})
    } else {
    	res.render('public/index', {title: 'Schedulize', loggedIn: false})
    }
  },

  renderUserApp: function(req, res){
	res.render('user/userIndex', {title: 'Schedulize', user: req.user, loggedIn: true});
  },

  getSignupPage: function(req, res){
    if(req.isAuthenticated()){
    	res.render('public/signup', {title: 'Schedulize', loggedIn: true})
    } else {
    	res.render('public/signup', {title: 'Schedulize', loggedIn: false})
    }
  },

  getLoginPage: function(req, res){
    res.render('public/login');
  }
};