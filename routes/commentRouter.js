const commentRouter = require('express').Router();

commentRouter.patch('/:comment_id', patchComment);

module.exports = commentRouter;
