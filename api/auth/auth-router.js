const { Router } = require('express');
const router = Router();
const { validatePayload } = require('../middleware/index');

router.post('/register', validatePayload(['username', 'password']), (req, res, next) => {
    console.log(req.body);
    res.status(200).json('account made');
})

router.post('/login', (req, res, next) => {

})

router.get('/logout', (req, res, next) => {

})

module.exports = router;