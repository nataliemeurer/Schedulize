var mongo = require('mongodb');
var db = require('../database/dbSchema');
var User = db.User;
var Company = db.Company;
var Schedule = db.Schedule;
var userController = require('../controllers/userController');
var availabilityController = require('../controllers/availabilityController');
var companyController = require('../controllers/companyController');
var scheduleController = require('../controllers/scheduleController');

module.exports = function (app) {
  // PARAM ROUTING
  app.param('companyId', companyController.processCompanyId);
  app.param('scheduleId', scheduleController.processScheduleId);
  app.param('userId', userController.processUserId);

  // API ROUTES
  // Companies:
  app.route('/companies')
      .get(companyController.getAllCompanies) // Get all company names
      .post(companyController.addNewCompany); // Add new company

  app.route('/companies/:companyId')
      .get(function(req, res){}) // Get company data
      .post(function(req, res){}) // Update company
      .put(function(req, res){}) // Update company
      .delete(function(req, res){}); // Delete company data

  app.route('/companies/:companyId/employees')
      .get(function(req, res){}) // get employees of a given company
      .post(function(req, res){}) // add employee(s) to a given company
      .delete(function(req, res){}); // remove employees from a given company
  
  // Users:
  app.route('/users')
      .get(function(req, res){ // return all users
      	User
          .find({})
          .populate('companies')
          .exec(function (err, users) {
            if (err) {
              return err;
            }
            res.status(200).send(users);
          });
      })
      .post(userController.createNewUser); // add new user

  app.route('/users/:userId')
      .get(function(req, res){ // get user data
        res.send(req.user);
      })
      .post(function(req, res){}) // add new values to user data
      .put(function(req, res){}) // update user data
      .delete(function(req, res){}); // delete user

  app.route('/users/availability')
      .get(function(req, res){})
      .post(function(req, res){})
      .put(function(req, res){})
      .delete(function(req, res){});

  app.route('/users/availability/:userId')
      .get(function(req, res){})
      .post(function(req, res){})
      .put(function(req, res){})
      .delete(function(req, res){});

  // Schedules
  app.route('/schedules')
      .get(scheduleController.getAllSchedules) // get all schedules
      .post(scheduleController.addNewSchedule); // add a new schedule

  app.route('/schedules/:companyId')
      .get(function(req, res){}) // get all schedules for that company
      .post(function(req, res){}) // add a new schedule for that company
      .put(function(req, res){}) // update schedule for that company
      .delete(function(req, res){}); // delete all schedules for a given company

  app.route('/schedules/:companyId/:scheduleId')
      .get(function(req, res){}) // Get data for that schedule
      .post(function(req, res){}) // Update schedule
      .put(function(req, res){}) // Update schedule
      .delete(function(req, res){}); // Delete schedule

  app.route('/schedules/:companyId/:scheduleId/populate')
      .post(function(req, res){}); // populate the schedule for a given company

  // To be deleted when Ids are set up
  app.post('/users/availability', function(req, res){
    // console.log(req.body);
    // var availability = req.body.availability;
    // var name = req.body.name;
    // var eligibility = req.body.eligibility;
    // var shiftsDesired = req.body.desiredShifts;
    // users.findOne({ name: name, availability: availability, shiftsDesired: shiftsDesired, eligibility: eligibility }).on('success', function(doc, err){
    // 	if (err) throw err;
    //   res.send(201, doc);
    // });
  });
};