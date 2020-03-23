const knex = require('../db/connection');
const { selectTopics, selectTopicBySlug } = require('./topicModels');

exports.selectArticles = query => {
  let queryObj = {
    sort_by: query.sort_by || 'created_at',
    order: query.order || 'desc',
    author: query.author,
    topic: query.topic
  };
  return knex
    .select('articles.*')
    .from('articles')
    .orderBy(queryObj.sort_by, queryObj.order)
    .count({ comment_count: 'comments.article_id' })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .modify(queryBuild => {
      if (queryObj.author !== undefined) {
        queryBuild.where('articles.author', '=', queryObj.author);
      }
    })
    .modify(queryBuild => {
      if (queryObj.topic !== undefined) {
        queryBuild.where('articles.topic', '=', queryObj.topic);
      }
    })
    .then(articles => {
      if (articles.length !== 0) {
        return articles;
      } else if (queryObj.topic !== undefined) {
        return knex('topics')
          .where('slug', queryObj.topic)
          .then(topic => {
            if (topic.length === 0) {
              return Promise.reject('noTopic');
            } else return [];
          });
      } else if (queryObj.author !== undefined) {
        return knex('users')
          .where('username', queryObj.author)
          .then(author => {
            if (author.length === 0) {
              return Promise.reject('noAuthor');
            } else return [];
          });
      }
    });
};

exports.selectArticleById = reqArticle => {
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
  const queryObj = { voteInc: reqBody.inc_votes || 0 };
  return knex
    .select('articles')
    .where('articles.article_id', reqArticle.article_id)
    .from('articles')
    .count({ comment_count: 'comments.article_id' })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .increment('votes', queryObj.voteInc)
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
