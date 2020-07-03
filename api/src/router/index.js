const express = require('express');
const path = require('path');
const sessionValidation = require('./middlewares/session');
const apigateway = require('./middlewares/auth-key');
const suggestionController = require('./suggestion');
const surveyTipsController = require('./survey/tips');
const tipsController = require('./tips');
const authController = require('./auth');

const routes = (server) => {
  server.use('/assets', express.static(path.join(__dirname, '../../assets')));

  server.get(
    '/auth/:userId/',
    apigateway.handle('auth'),
    authController.handle
  );

  server.get(
    '/tips',
    apigateway.handle('tips'),
    tipsController.handle,
  );

  server.get(
    '/suggestion',
    apigateway.handle('suggestion'),
    sessionValidation,
    suggestionController.handle,
  );

  server.post(
    '/survey/tips/:tipId/:action/',
    apigateway.handle('survey'),
    sessionValidation,
    surveyTipsController.handle,
  );
};


module.exports = routes;
