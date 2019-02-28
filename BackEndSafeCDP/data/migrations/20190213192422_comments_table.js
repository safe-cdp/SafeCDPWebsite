exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', table => {
    table.increments();
    table.string('content').notNullable();
    table.integer('user_id').unsigned();
    table
      .foreign('user_id')
      .references('id')
      .on('users');
    table.integer('post_id').unsigned();
    table
      .foreign('post_id')
      .references('id')
      .on('posts');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comments');
};
