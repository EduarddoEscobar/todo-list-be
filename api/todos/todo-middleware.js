const Todos = require('./todo-model');

function checkValidId(req, res, next){
    Todos.getById(req.params.id)
        .then(todo => req.body = todo)
        .catch(err => next({...err, status: 404, customMessage: `Todo with the id ${req.params.id} was not found`}));
}

module.exports = {
    checkValidId
}