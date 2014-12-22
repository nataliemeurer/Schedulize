var authController = require('../controllers/authController');

module.exports = function (app) {
  app.route('/signup/employee')
    .post();

  app.post('/signin', function(req, res){

  });
};
