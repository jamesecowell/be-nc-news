const knex = require('../db/connection');

exports.selectArticles = reqArticle => {
  return knex
    .select('articles.*')
    .where('articles.article_id', reqArticle.article_id)
    .from('articles')
    .count({ comment_count: 'comments.article_id' })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .then(result => {
      if (result.length !== 0) {
        return result;
      } else {
        return Promise.reject('noArticle');
      }
    });
};

exports.amendArticle = (reqArticle, reqBody) => {
  return knex
    .select('articles')
    .where('articles.article_id', reqArticle.article_id)
    .from('articles')
    .count({ comment_count: 'comments.article_id' })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .increment('votes', reqBody.inc_votes)
    .returning('*')
    .then(result => {
      if (result.length !== 0) {
        return knex
          .select('articles.*')
          .where('articles.article_id', reqArticle.article_id)
          .from('articles')
          .count({ comment_count: 'comments.article_id' })
          .leftJoin('comments', 'articles.article_id', 'comments.article_id')
          .groupBy('articles.article_id');
      } else {
        return Promise.reject('noArticle');
      }
    });
};
