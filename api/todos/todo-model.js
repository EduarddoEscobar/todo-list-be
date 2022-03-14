const db = require('../../data/db-config');

function getAll(){
    return db('todos');
}

function getById(todo_id){
    return db('todos').where({ todo_id }).first();
}

function getByTitle(todo_title){
    return db('todos').where('todo_title', todo_title).first();
}

async function create(todo){
    const [id] = await db('todos').insert(todo);
    return { 
        id, 
        ...todo, 
        due_date: todo.due_date ? todo.due_date : 'n/a'
    }
}

async function update(todo_id, todo){
    await db('todos').where({ todo_id }).update(todo);
    return { 
        todo_id,
        ...todo
    }
}

async function remove(todo_id){
    const todo = await db('todos').where({ todo_id }).first();
    await db('todos').where({ todo_id }).del();
    return todo;
}

module.exports = {
    getAll,
    getById,
    getByTitle,
    create,
    update,
    remove
}