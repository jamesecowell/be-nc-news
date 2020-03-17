const knex = require('../db/connection');

exports.selectUsers = reqUser => {
  return knex('users')
    .select()
    .where('username', reqUser.username);
};
