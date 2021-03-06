const { selectTopics } = require('../models/topicModels');

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then(topics => {
      res.status(200).send({ topics: topics });
    })
    .catch(err => {
      next(err);
    });
};
