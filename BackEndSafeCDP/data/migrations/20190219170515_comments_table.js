exports.up = function(knex, Promise) {
  return knex.schema.table('comments', table => {
    table.string('username');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('comments', table => table.dropColumn('username'));
};
