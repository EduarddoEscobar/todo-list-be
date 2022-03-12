const { Router } = require('express');
const router = Router();

router.post('/register', (req, res, next) => {
    console.log(req.payload);
})

router.post('/login', (req, res, next) => {

})

router.get('/logout', (req, res, next) => {

})

module.exports = router;