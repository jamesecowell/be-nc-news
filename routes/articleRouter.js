const articleRouter = require('express').Router();
const { getArticles } = require('../controllers/articleControllers');

articleRouter.get('/:article_id', getArticles);

module.exports = articleRouter;
