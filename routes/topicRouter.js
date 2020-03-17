const topicRouter = require('express').Router();
const { getTopics } = require('../controllers/topicControllers');

topicRouter.get('/', getTopics);

module.exports = topicRouter;
