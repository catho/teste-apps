const express = require('express');
const path = require('path');
const sessionValidation = require('./middlewares/session'); 
const suggestionController = require('./suggestion');
const surveyTipsController = require('./survey/tips');

const routes = (server) => {
  server.use('/assets', express.static(path.join(__dirname, '../../assets')));

  server.get(
    '/suggestion',
    sessionValidation,
    suggestionController.handle
  );

  server.post(
    '/survey/tips/:tipId/',
    sessionValidation,
    surveyTipsController.handle,
  );
};


module.exports = routes;
