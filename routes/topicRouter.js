const topicRouter = require('express').Router();
const { getTopics } = require('../controllers/topicControllers');
const { send405Error } = require('../errors/errors');

topicRouter.get('/', getTopics);
topicRouter.all('/', send405Error);

module.exports = topicRouter;
