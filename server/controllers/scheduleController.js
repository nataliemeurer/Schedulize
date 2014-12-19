var db = require('../database/dbSchema');
var mongoose = require('mongoose');
var User = db.User;
var Company = db.Company;
var Schedule = db.Schedule;

module.exports = {
  processScheduleId: function(req, res, next, code){
    Schedule.findOne({_id: code})
        .exec(function(err, schedule){
          if(err) {
            console.log("Unable to process scheduleId");
            req.status(404).send(err);
          }
          req.scheduleId = code;
          req.schedule = schedule;
          next();
        });
  },
  
  getAllSchedules: function(req, res){
    Schedule
      .find()
      .exec(function(err, docs){
        if(err) {
          res.status(500);
        }
        res.status(200).send(docs);
      });
  },

  getScheduleById: function(req, res){
    Schedule
      .findOne({_id: req.scheduleId})
      .exec(function(err, schedule){
        if(err) {
          res.status(500);
        }
        res.status(200).send(schedule);
      });
  },

  getScheduleShifts: function(req, res){
    Schedule.findOne({_id: req.scheduleId})
      .exec(function(err, schedule){
        if(err) {
          res.status(500);
        }
        res.status(200).send(schedule.shifts);
      })
  },

  updateScheduleById: function(req, res){
    var schedule = req.body;
    Schedule
      .findOne({ _id: req.body._id }, function(err, doc){ 
        doc.roles = schedule.roles.slice(0);
        doc.shifts = JSON.parse(JSON.stringify(schedule.shifts)); //used to create a pseudo deep copy
        doc.employees = schedule.employees.slice(0);
        doc.shiftsAssigned = schedule.shiftsAssigned;
        doc.totalShifts = schedule.totalShifts;
        doc.save(function(err, schedule){
          if(err){
            res.status(500).send(err);
          }
          res.status(200).send(schedule);
        });
      });
  },

  addNewSchedule: function(req, res){
    var newSchedule = new Schedule({
        name: req.body.name,
        companyId: req.body.companyId || "548951472119af472fba5ed0",
        shifts: req.body.shifts || [],
        createdBy: req.body.username || "test user",
        createdAt: new Date(),
        totalShifts: req.body.totalShifts || 0,
        shiftsAssigned: 0,
        employees: req.body.employees || [],
        roles: req.body.roles || []
    });
    newSchedule.save(function(err, doc){
      if(err){
        console.log(err);
        res.status(500).send(err);
      }
      console.log("Saved");
      res.status(201).send(doc);
    });
  },

  deleteSchedule: function(req, res){
    Schedule.findOne({_id: req.scheduleId})
      .remove()
      .exec(function(err, data){
        if(err){
          res.status(500).send(err);
        }
        res.status(200).send(data);
      });
  }
};