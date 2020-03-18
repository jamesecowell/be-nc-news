exports.up = function(knex) {
  console.log('creating articles table...');
  return knex.schema.createTable('articles', articlesTable => {
    articlesTable
      .increments('article_id')
      .primary()
      .notNullable();
    articlesTable.string('title').notNullable();
    articlesTable.text('body').notNullable();
    articlesTable
      .integer('votes')
      .defaultTo(0)
      .notNullable();
    articlesTable
      .string('topic')
      .references('topics.slug')
      .notNullable();
    articlesTable
      .string('author')
      .references('users.username')
      .notNullable();
    articlesTable
      .datetime('created_at', { precision: 6 })
      .defaultTo(knex.fn.now(6))
      .notNullable();
  });
};

exports.down = function(knex) {
  console.log('dropping articles table...');
  return knex.schema.dropTable('articles');
};
