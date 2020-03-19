const knex = require('../db/connection');

exports.addComment = (article, comment) => {
  console.log(comment.username);
  let parsedId = parseInt(article.article_id);
  return knex('comments')
    .where('article_id', article.article_id)
    .insert(
      { article_id: parsedId },
      { author: comment.username },
      { body: comment.body }
    )
    .returning('*');
};

exports.getComments = (article, query) => {
  const queryObj = {
    sort_by: query.sort_by || 'created_at',
    order: query.order || 'desc'
  };
  return knex('comments')
    .where('article_id', article.article_id)
    .orderBy(queryObj.sort_by, queryObj.order);
};
