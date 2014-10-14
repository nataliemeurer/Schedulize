var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/schedulize');
var companies = db.get('companies');
var users = db.get('users');

router.get('/', function(req, res) {
  res.render('admin/adminIndex', {title: 'Administrator Page', username: "Kevin Meurer, Director of All Things Ever"});
});

module.exports = router;
