exports.up = function(knex, Promise) {
  return knex.schema.table('posts', table => {
    table.string('liked_by');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('posts', table => table.dropColumn('liked_by'));
};
