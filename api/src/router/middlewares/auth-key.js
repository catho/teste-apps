const keysDb = require('../../db/keys');

const AuthKey = {
    handle(api) {
        return (request, response, next) => {
            const authKey = request.headers['x-api-key'];

            if (!authKey) {
                return response.status(401).json({
                    status: 401,
                    message: 'Access unauthorized. Missing the auth key header'
                });
            }

            if (keysDb[api] !== authKey) {
                return response.status(401).json({
                    status: 401,
                    message: 'Access unauthorized. Invalid auth key'
                });
            }

            return next();
        }
    }
};

module.exports = AuthKey;