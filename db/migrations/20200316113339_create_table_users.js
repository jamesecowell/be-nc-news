exports.up = function(knex) {
  console.log('creating users table...');
  return knex.schema.addTable('users', usersTable => {
    usersTable.string('username').primary();
    usersTable.string('avatar_url');
    usersTable.string('name');
  });
};

exports.down = function(knex) {
  console.log('dropping users table...');
  return knex.schema.dropTable('users');
};
