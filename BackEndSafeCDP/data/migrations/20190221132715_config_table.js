exports.up = function(knex, Promise) {
  return knex.schema.createTable('config', table => {
    table.increments();
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.string('username').notNullable();
    table.string('avatar', 500000).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('config');
};
