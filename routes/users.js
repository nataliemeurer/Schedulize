var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('user/userIndex', {username: "Kevin Meurer, Vital Vittles", title: "User Access"});
});

module.exports = router;
