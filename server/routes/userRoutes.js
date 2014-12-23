var express = require('express');
var authController = require('../controllers/authController');
var renderingController = require('../controllers/renderingController');

module.exports = function (app) {
  app.route('/')
    .get(authController.isLoggedInUser, renderingController.renderUserApp);
};

