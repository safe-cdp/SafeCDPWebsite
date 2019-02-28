exports.up = function(knex, Promise) {
  return knex.schema.table('comments', table => {
    table.string('avatar', 500000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('comments', table => table.dropColumn('avatar'));
};
