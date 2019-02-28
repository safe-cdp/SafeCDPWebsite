exports.up = function(knex, Promise) {
  return knex.schema.table('posts', table => {
    table.string('created_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('posts', table => table.dropColumn('created_at'));
};
