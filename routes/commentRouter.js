const {
  patchComment,
  deleteComment
} = require('../controllers/commentController');

const commentRouter = require('express').Router();

commentRouter.patch('/:comment_id', patchComment);
commentRouter.delete('/:comment_id', deleteComment);

module.exports = commentRouter;
