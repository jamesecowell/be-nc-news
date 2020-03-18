const articleRouter = require('express').Router();
const {
  getArticles,
  patchArticles
} = require('../controllers/articleControllers');

articleRouter.get('/:article_id', getArticles);
articleRouter.patch('/:article_id', patchArticles);

module.exports = articleRouter;
