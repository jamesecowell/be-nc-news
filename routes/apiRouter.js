const apiRouter = require('express').Router();
const topicRouter = require('./topicRouter');
const userRouter = require('./userRouter');
const articleRouter = require('./articleRouter');
const { errors } = require('../errors/errors');

apiRouter.use('/topics', topicRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use(errors);

module.exports = apiRouter;
