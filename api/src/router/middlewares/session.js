const jwtDecoder = require('jwt-decode');
const db = require('../../db');

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

module.exports = middleware;