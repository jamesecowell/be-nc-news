exports.up = function(knex) {
  // console.log('creating comments table...');
  return knex.schema.createTable('comments', commentsTable => {
    commentsTable
      .increments('comment_id')
      .primary()
      .notNullable();
    commentsTable
      .string('author')
      .references('users.username')
      .notNullable();
    commentsTable
      .integer('article_id')
      .references('articles.article_id')
      .notNullable();
    commentsTable
      .integer('votes')
      .defaultTo(0)
      .notNullable();
    commentsTable
      .datetime('created_at', { precision: 6 })
      .defaultTo(knex.fn.now(6))
      .notNullable();
    commentsTable.text('body').notNullable();
  });
};

exports.down = function(knex) {
  // console.log('dropping comments table...');
  return knex.schema.dropTable('comments');
};
