exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', table => {
    table.increments();
    table.string('fullname').notNullable();
    table.string('email').notNullable();
    table.string('timestamp').notNullable();
    table.string('message').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('messages');
};
