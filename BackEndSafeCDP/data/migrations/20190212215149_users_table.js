exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('Firstname', 255).notNullable();
    table.string('Lastname', 255).notNullable();
    table
      .string('email', 255)
      .notNullable()
      .unique();
    table
      .string('username', 255)
      .notNullable()
      .unique();
    table.string('password', 255).notNullable();
    table.boolean('admin').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
