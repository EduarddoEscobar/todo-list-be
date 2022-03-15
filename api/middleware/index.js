const validatePayload = keys => (req, res, next) => {
    const payload = req.body;
    req.payload = {};

    for (let key of keys) {

        let value = payload[key];
        if (typeof value === 'string') value = value.trim();

        if (value == null) {
            next({
                status: 400,
                customMessage: `${key} needs to be filled out`
            });
        } else {
            req.payload = {
                ...req.payload,
                [key]: typeof value === 'string' ? value.replace(/[^a-zA-Z]/g, '') : value
            };
        }
    }

    next();
}

const restricted = (req, res, next) => {
    if (!req.session.user) {
        next({
            status: 401,
            customMessage: "You are not allowed here"
        });
    }
    next();
}

module.exports = {
    validatePayload,
    restricted
}