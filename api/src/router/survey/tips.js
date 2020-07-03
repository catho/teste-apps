const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const tipsDb = require('../../db/tips/list');
const actions = {
    'like': true,
    'dislike': false,
};

module.exports = {
    handle: (request, response) => {
        const { tipId, action } = request.params;

        const tip = tipsDb.filter(
            (tip) => tip.id === tipId,
        );

        if (tip.length === 0) {
            return response.status(404).json({
                status: 404,
                messagem: 'tip not found',
            });
        }

        if (actions[action] === undefined) {
            return response.status(404).json({
                status: 404,
                messagem: 'action not found',
            });
        }

        return response.status(201).json({
            id: uuidv4(),
            'created-at': moment().format('YYYY-MM-DDTHH:mm:ss.sssZ'),
            tipId,
            action,
            message: 'Answer was registered',
        });
    },
};
