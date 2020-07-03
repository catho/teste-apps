const jwtDecoder = require('jwt-decode');
const express = require('express');
const path = require('path');
const db = require('../db');

const middleware = (request, response, next) => {
    const authToken = request.headers.authorization;
    let user = {};
    
    try {
        user = jwtDecoder(authToken);
    } catch (err) {
        user = {};
    }
    
    if (!authToken || !user.sub || !db[user.sub]) {
        return response.status(401).json({
            status: 401,
            message: 'Access unauthorized',
        });
    }

    return next();
}

const routes = (server) => {
  server.use('/assets', express.static(path.join(__dirname, '../../assets')));

  server.get(
    '/suggestion',
    middleware,
    (request, response) => {
        response.status(200).json({
            status: true,
        });
    },
  );
};


module.exports = routes;
