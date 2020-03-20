const knex = require('../db/connection');

exports.addComment = (article, comment) => {
  let parsedId = parseInt(article.article_id);
  return knex('comments')
    .where('article_id', article.article_id)
    .insert({
      article_id: parsedId,
      author: comment.username,
      body: comment.body
    })
    .returning('*');
};

exports.getComments = (article, query) => {
  const queryObj = {
    sort_by: query.sort_by || 'created_at',
    order: query.order || 'desc'
  };
  if (article.article_id !== NaN) {
    return knex('comments')
      .where('article_id', article.article_id)
      .orderBy(queryObj.sort_by, queryObj.order)
      .then(res => {
        if (res.length !== 0) {
          return res;
        } else {
          return Promise.reject('noArticle');
        }
      });
  } else {
    return Promise.reject('badRequest');
  }
};

exports.amendComment = (comment, patch) => {
  return knex('comments')
    .where('comment_id', comment.comment_id)
    .increment('votes', patch.inc_votes)
    .returning('*')
    .then(res => {
      if (res.length !== 0) {
        return res;
      } else {
        return Promise.reject('noComment');
      }
    });
};

exports.removeComment = comment => {
  return knex('comments')
    .where('comment_id', comment.comment_id)
    .then(result => {
      if (result.length !== 0) {
        return knex('comments')
          .where('comment_id', comment.comment_id)
          .del()
          .then(res => {
            return res;
          });
      } else {
        return Promise.reject('noComment');
      }
    });
};
