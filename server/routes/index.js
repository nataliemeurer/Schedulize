var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/schedulize');
var companies = db.get('companies');
var users = db.get('users');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('external/index', {title: 'Schedulize'});
});

/* GET New User page. */
router.get('/signup', function(req, res) {
  res.render('external/newuser', { title: 'Sign Up for Schedulize' });
});

router.get('/signin', function(req, res){

})

router.post('/signin', function(req, res){

});

module.exports = router;
