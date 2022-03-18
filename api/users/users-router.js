const { validatePayload } = require('../middleware/index');
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const Users = require('./users-model');
const Todos = require('../todos/todo-model');
const router = Router();

router.get('/', (req, res, next) => {
    Users.getAll()
        .then(users => res.status(200).json(users))
        .catch(next);
})

router.get('/self', (req, res, next) => {
    Users.getById(req.session.user.user_id)
        .then(user => res.status(200).json({ user_id: user.user_id, username: user.username }))
        .catch(next);
})

router.get('/self/todos', (req, res, next) => {
    Todos.getUserTodos(req.session.user.user_id)
        .then(todos => res.status(200).json(todos))
        .catch(next);
})

router.put('/self', validatePayload(['username', 'password']), (req, res, next) => {
    let { username, password } = req.payload;
    password = bcrypt.hashSync(password, 12);
    Users.update(req.session.user.user_id, { username, password })
        .then(user => res.status(200).json(user))
        .catch(next)
})

router.delete('/self', (req, res, next) => {
    Users.remove(req.session.user.user_id)
        .then(user => {
            req.session.destroy(err => {
                if(err){ 
                    next({message: 'There was an error logging out'});
                }
            })
            res.status(200).json({message: 'Account was successfully deleted', user});
        }).catch(next);
})

module.exports = router;