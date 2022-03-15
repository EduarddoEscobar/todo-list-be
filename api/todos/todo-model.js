const db = require('../../data/db-config');

async function getAll(){
    let todos = await db('todos');
    todos.forEach(todo => todo.todo_completed = todo.todo_completed === 1);
    return todos;
}

function getById(todo_id){
    return db('todos').where({ todo_id }).first();
}

function getByTitle(todo_title){
    return db('todos').where('todo_title', todo_title).first();
}

function getUserTodos(user_id){
    return db('todos as t')
        .leftJoin('users as u', 'u.user_id', 't.user_id')
        .select('t.todo_id', 't.todo_title', 't.todo_description', 't.due_date', 't.todo_completed', 'u.username')
        .where('t.user_id', user_id);
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
    getUserTodos,
    create,
    update,
    remove
}