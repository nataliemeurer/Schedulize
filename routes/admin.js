var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('helloworld', {title: 'the coolest place ever'});
});

module.exports = router;
