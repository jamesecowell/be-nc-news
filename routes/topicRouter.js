const topicRouter = require('express').Router();
const { getTopics } = require('../controllers/topicControllers');

topicRouter.route('/').get(getTopics);

module.exports = topicRouter;
