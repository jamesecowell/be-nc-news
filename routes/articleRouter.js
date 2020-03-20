const articleRouter = require('express').Router();
const {
  getArticleById,
  getArticles,
  patchArticles,
  getArticleComments,
  postArticleComment
} = require('../controllers/articleControllers');
const { send405Error } = require('../errors/errors');

articleRouter.get('/', getArticles);
articleRouter.all('/', send405Error);
articleRouter.get('/:article_id', getArticleById);
articleRouter.patch('/:article_id', patchArticles);
articleRouter.all('/:article_id', send405Error);
articleRouter.get('/:article_id/comments', getArticleComments);
articleRouter.post('/:article_id/comments', postArticleComment);
articleRouter.all('/:article_id/comments', send405Error);

module.exports = articleRouter;
