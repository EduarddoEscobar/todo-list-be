exports.seed = async function(knex) {
  await knex('users').insert([
    {username: 'Plankton', password: 'password123'},
    {username: 'Rudeus', password: 'password123'},
    {username: 'Naruto', password: 'password123'}
  ]);
};
