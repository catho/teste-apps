const tips = require('../../db/tips/list');

module.exports = {
    handle: (request, response) => {
        response
            .status(200)
            .json(tips);
    }
};