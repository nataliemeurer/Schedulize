var db = require('../database/dbSchema');
var User = db.User;
var Company = db.Company;
var Schedule = db.Schedule;

module.exports = {
	processCompanyId: function(req, res, next, code){
    req.companyId = code;
    Company
      .find({ _id: code })
      .exec(function(err, company){
        if(err){
          res.status(404);
        }
        req.company = company;
        next();
      });
  },

  getAllCompanies: function(req, res){
		Company
			.find()
			.exec(function(err, docs){
        if(err) {
					res.status(500);
				}
				res.status(200).send(docs);
			});
	},

	addNewCompany: function(req, res){
    var newCompany = new Company({
        name: req.body.name,
        employees: [],
        admins: [],
        schedules: [],
        employeePassword: req.body.employeePassword
      });
    newCompany.save(function(err, doc){
      if(err){
        res.status(500).send(err);
      }
      console.log("Saved");
      res.status(201).send(doc);
    });
	}
};