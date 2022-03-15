const { Router } = require('express');
const Users = require('./users-model');
const router = Router();

router.get('/', (req, res, next) => {
    Users.getAll()
        .then(users => res.status(200).json(users))
        .catch(next);
})

module.exports = router;