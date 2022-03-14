const db = require('../../data/db-config');

function getAll(){
    return db('users')
        .select('user_id', 'username');
}

function getById(user_id){
    return db('users as u')
        .select('u.user_id', 'u.username', 'u.password')
        .where({ user_id });
}

async function create(user){
    let [id] = await db('users').insert(user);
    return {
        user_id: id,
        username: user.username
    };
}

async function update(user_id, user){
    await db('users').where({ user_id }).insert(user);
    return {
        user_id,
        username: user.username
    };
}

async function remove(user_id){
    let user = await db('users').where({ user_id }).select('u.user_id', 'u.username');
    await db('users').where({ user_id }).del();
    return user;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}