 const {Router} = require('express');
const Todos = require('./todo-model');
const router = Router();

router.get('/', async (req, res, next) => {
    try{
        let todos = await Todos.getAll();
        res.status(200).json(todos);
    }catch(err){
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        let todo = await Todos.getById(req.params.id);
        res.status(200).json(todo);
    }catch(err){
        next(err);
    }
})

module.exports = router;