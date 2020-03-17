const apiRouter = require('express').Router();

apiRouter.use('/topics', topicRouter);

module.exports = apiRouter;
