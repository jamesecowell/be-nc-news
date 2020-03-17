const apiRouter = require('express').Router();
const topicRouter = require('./topicRouter');

apiRouter.use('/topics', topicRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;
