exports.seed = async function(knex) {
  await knex('todos').insert([
    {todo_title: 'Steal the Krabby Patty secret formula', todo_description: 'Krabs deserves it', due_date: 'tomorrow', todo_completed: false, user_id: 1},
    {todo_title: 'World domination', todo_description: 'Rule over the bikini bottom', todo_completed: false, user_id: 1},
    {todo_title: 'Pray to god', todo_description: 'go to the secret room in the basement', due_date: 'at night', todo_completed: true, user_id: 2},
    {todo_title: 'Become hokage', todo_description: 'Beat kakashi sensei', todo_completed: false, user_id: 3}
  ]);
};
