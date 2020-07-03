const jwtDecoder = require('jwt-decode');
const user1 = require('../../db/user/cc3431c3-d9c9-48e2-8a1f-c3c0260f0712');
const user2 = require('../../db/user/ee09bd39-4ca2-47ac-9c5e-9c57ba5a26dc');

const users = {
    'cc3431c3-d9c9-48e2-8a1f-c3c0260f0712': user1,
    'ee09bd39-4ca2-47ac-9c5e-9c57ba5a26dc': user2,
};

const middleware = (request, response, next) => {
    const authToken = request.headers.authorization;
    let user = {};

    try {
        user = jwtDecoder(authToken);
    } catch (err) {
        user = {};
    }

    if (!authToken || !user.sub || !users[user.sub]) {
        return response.status(401).json({
            status: 401,
            message: 'Access unauthorized. Invalid user token',
        });
    }

    return next();
}

module.exports = middleware;