const { Router } = require('express');
const router = Router();
const Users = require('./users-model');

router.get('/', (req, res, next) => {
    Users.getAll()
        .then(users => res.status(200).json(users))
        .catch(next);
})

module.exports = router;