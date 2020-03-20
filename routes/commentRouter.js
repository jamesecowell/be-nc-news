const {
  patchComment,
  deleteComment
} = require('../controllers/commentController');
const { send405Error } = require('../errors/errors');

const commentRouter = require('express').Router();

commentRouter.patch('/:comment_id', patchComment);
commentRouter.delete('/:comment_id', deleteComment);
commentRouter.all('/:coment_id', send405Error);

module.exports = commentRouter;
