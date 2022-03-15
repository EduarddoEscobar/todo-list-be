const validatePayload = keys => (req, res, next) => {
    const payload = req.body;
    req.payload = {};
    for (let key of keys) {

        let value = payload[key];
        let isString = typeof value === 'string';

        if (isString) value = value.trim();

        if (value == null) {
            next({
                status: 400,
                customMessage: `${key} needs to be filled out`
            });
        } else {
            req.payload = {
                ...req.payload,
                [key]: typeof value === 'string' ? value.trim() : value
            };
        }
    }
    console.log("middleware payload: ", req.payload);
    next();
}

const restricted = (req, res, next) => {
    if (!req.session.user) {
        next();
    } else {
        next({
            status: 401,
            customMessage: "You are not allowed here"
        });
    }
}

module.exports = {
    validatePayload,
    restricted
}