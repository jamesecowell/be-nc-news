const knex = require('../db/connection');

exports.selectUsers = reqUser => {
  return knex('users')
    .select()
    .where('username', reqUser.username)
    .then(result => {
      if (result.length !== 0) {
        return result;
      } else {
        return Promise.reject('noUser');
      }
    });
};
