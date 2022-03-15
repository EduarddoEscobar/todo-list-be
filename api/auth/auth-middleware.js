const Users = require('../users/users-model');

async function usernameFree(req, res, next) {
    let user = await Users.getByUsername(req.payload.username);
    if(user == null){
        next();
    }else{
        next({status: 422, customMessage: 'Username is already taken'});
    }
}

async function usernameExist(req, res, next) {
    let user = await Users.getByUsername(req.payload.username);
    if(user){
        req.user = user;
        next();
    }else{
        next({status: 404, customMessage: 'Username does not exist'});
    }
}

module.exports = {
    usernameFree,
    usernameExist
}