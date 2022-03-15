const Users = require('../users/users-model');

async function usernameFree(req, res, next) {
    let user = await Users.getByUsername(req.payload.username);
}