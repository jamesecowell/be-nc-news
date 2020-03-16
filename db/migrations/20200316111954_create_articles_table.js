exports.up = function(knex) {
  console.log('creating articles table...');
  return knex.scheme.createTable('articles', articlesTable => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title').notNullable();
  });
};

exports.down = function(knex) {};
