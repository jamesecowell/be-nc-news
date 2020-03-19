const { amendComment, removeComment } = require('../models/commentModels');

exports.patchComment = (req, res, next) => {
  amendComment(req.params, req.body)
    .then(patchedComment => {
      res.status(201).send(patchedComment[0]);
    })
    .catch(err => {
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
  removeComment(req.params)
    .then(deletedComment => {
      res.status(204).send();
    })
    .catch(err => {
      next(err);
    });
};
