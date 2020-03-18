const knex = require('../db/connection');

exports.selectArticles = reqArticle => {
  return knex
    .select('articles.*')
    .where('articles.article_id', reqArticle.article_id)
    .from('articles')
    .count({ comment_count: 'comments.article_id' })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id');
};
