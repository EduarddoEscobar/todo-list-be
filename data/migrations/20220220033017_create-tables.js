exports.up = function (knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments('user_id');
      tbl.string('username', 128).notNullable().unique();
      tbl.string('password', 128).notNullable();
    })
    .createTable('todos', tbl => {
      tbl.increments('todo_id');
      tbl.string('todo_title', 128).notNullable();
      tbl.string('todo_description', 128).notNullable();
      tbl.string('due_date');
      tbl.boolean('todo_completed').defaultTo(false);
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('todos')
    .dropTableIfExists('users');
};