module.exports = {
    handle: (request, response) => {
        response.status(200).json({
            status: true,
        });
    },
};