const knex = require('../db/connection');

exports.selectTopics = () => {
  return knex('topics').select('slug', 'description');
};

exports.selectTopicBySlug = slug => {
  return knex('topics').where('slug', slug);
};
