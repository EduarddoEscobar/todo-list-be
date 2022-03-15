const Todos = require('./todo-model');

async function checkValidId(req, res, next){
    let todo = await Todos.getById(req.params.id);
    if(todo){
        req.todo = todo;
        next();
    }else{
        next({...err, status: 404, customMessage: `Todo with the id ${req.params.id} was not found`})
    }
}

async function checkIsYours(req, res, next){
    if(req.todo.user_id === req.session.user.user_id){
        next();
    }else{
        next({status: 403, customMessage: `Todo with id: ${req.params.id} is not yours!`})
    }
}

module.exports = {
    checkValidId,
    checkIsYours
}