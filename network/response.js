const statusMessage = {
    200: 'Done',
    201: 'Created',
    400: 'Invalid format',
    500: 'Internal error'
}

exports.success = function(req, res, message, status) {
    if (!status) status = 200;
    if (!message) message = statusMessage[status];
    res.status(status).send({
        error: '',
        body: message
    });
}

exports.error = function(req, res, error, status, details) {
    if (!status) status = 500;
    if (!error) error = statusMessage[status];
    console.error("[response error]: " + details)
    res.status(status).send({
        error: error,
        body: ''
    });
}