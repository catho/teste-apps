const suggestions = require('../../db/suggestions');

module.exports = {
    handle: (request, response) => {
        response.status(200).json(suggestions);
    },
};