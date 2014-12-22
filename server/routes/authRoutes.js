var authController = require('../controllers/authController');

module.exports = function (app) {
  app.route('/signup/employee')
    .post(authController.createNewEmployee);

  app.route('/signup/company')
    .post(authController.createNewCompany)

  app.post('/signin', function(req, res){

  });
};
