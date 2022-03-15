const { checkValidId, checkIsYours } = require('./todo-middleware');
const { validatePayload } = require('../middleware/index');
const { Router } = require('express');
const Todos = require('./todo-model');
const router = Router();

router.get('/', (req, res, next) => {
    Todos.getAll()
        .then(todos => res.status(200).json(todos))
        .catch(next);
})

router.get('/:id', checkValidId, (req, res, next) => {
    res.status(200).json(req.todo);
})

router.post('/', validatePayload(['todo_title', 'todo_description']), (req, res, next) => {
    Todos.create({...req.body, user_id: req.session.user.user_id})
        .then(todo => res.status(201).json(todo))
        .catch(next);
})

router.put('/:id', checkValidId, validatePayload(['todo_title', 'todo_description']), (req, res, next) => {
    Todos.update(req.params.id, {...req.todo, ...req.payload})
        .then(todo => res.status(200).json(todo))
        .catch(next);
})

router.delete('/:id', checkValidId, checkIsYours, (req, res, next) => {
    Todos.remove(req.params.id)
        .then(todo => res.status(200).json(todo))
        .catch(next);
})

module.exports = router;