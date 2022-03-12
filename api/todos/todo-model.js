const db = require('../../data/db-config');

function getAll(){
    return db('todos');
}

function getById(id){
    return db('todos').where({ id }).first();
}

function getByTitle(title){
    return db('todos').where('todo_title', title).first();
}

async function create(todo){
    const [id] = await db('todos').insert(todo);
    return { 
        id, 
        ...todo, 
        due_date: todo.due_date ? todo.due_date : 'n/a'
    }
}

async function update(id, todo){
    const res = await db('todos').update(todo);
    console.log(res);
}

async function remove(id){
    const todo = await db('todos').where({ id }).first();
    await db('todos').where({id}).del();
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