var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('admin/adminIndex', {title: 'Administrator Page', username: "Kevin Meurer, Director of All Things Ever"});
});

module.exports = router;
