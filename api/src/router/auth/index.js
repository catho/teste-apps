const user1 = require('../../db/user/cc3431c3-d9c9-48e2-8a1f-c3c0260f0712');
const user2 = require('../../db/user/ee09bd39-4ca2-47ac-9c5e-9c57ba5a26dc');

const users = {
    'cc3431c3-d9c9-48e2-8a1f-c3c0260f0712': user1,
    'ee09bd39-4ca2-47ac-9c5e-9c57ba5a26dc': user2,
};

module.exports = {
    handle: (request, response) => {
        const { userId } = request.params;

        if (!users[userId]) {
            return response.status(404).json({
                status: 404,
                message: 'User not found',
            });
        }

        return response
            .status(200)
            .json(users[userId]);
    }
};