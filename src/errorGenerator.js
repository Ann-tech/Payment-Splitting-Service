function generateError(err) {
    err.status = 400;
    throw err;
}

module.exports = {
    generateError
}

