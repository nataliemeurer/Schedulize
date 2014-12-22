var db = require('../config/dbSchema');
var User = db.User;
var Company = db.Company;
var Schedule = db.Schedule;

module.exports = {
  renderHomePage: function(req, res){
    res.render('public/index', {title: 'Schedulize'})
  },

  getSignupPage: function(req, res){
    res.render('public/signup');
  },
  getLoginPage: function(req, res){
    res.render('public/login');
  }
};