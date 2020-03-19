const articleRouter = require('express').Router();
const {
  getArticles,
  patchArticles,
  getArticleComments,
  postArticleComment
} = require('../controllers/articleControllers');
// const commentRouter = require('./commentRouter');

articleRouter.get('/:article_id', getArticles);
articleRouter.patch('/:article_id', patchArticles);
articleRouter.get('/:article_id/comments', getArticleComments);
articleRouter.post('/:article_id/comments', postArticleComment);

module.exports = articleRouter;
