const { Router } = require('express');
const { validatePayload } = require('../middleware/index');
const { usernameExist, usernameFree } = require('./auth-middleware');
const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');
const router = Router();

router.post('/register', validatePayload(['username', 'password']), usernameFree, (req, res, next) => {
    let { username, password } = req.payload;
    password = bcrypt.hashSync(password, 12);
    Users.create({ username, password })
        .then(user => res.status(201).json(user))
        .catch(next);
})

router.post('/login', validatePayload(['username', 'password']), usernameExist , (req, res, next) => {
    let { password } = req.payload;
    if(bcrypt.compareSync(password, req.user.password)){
        req.session.user = req.user;
        res.status(200).json(`Welcome ${req.user.username}`);
    }else{
        next({status: 401, customMessage: 'Invalid Credentials'});
    }
})

router.get('/logout', (req, res, next) => {
    if(req.session.user){
        req.session.destroy(err => {
            if(err){
                next({message: 'There was an error logging out'});
            }else{
                res.json({message: 'Logged out'});
            }
        })
    }else{
        res.status(401).json({message: 'no session'});
    }
})

module.exports = router;