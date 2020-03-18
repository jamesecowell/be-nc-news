const { selectArticles } = require('../models/articleModels');

exports.getArticles = (req, res, next) => {
  selectArticles(req.params)
    .then(articles => {
      res.status(200).send(articles[0]);
    })
    .catch(err => {
      next(err);
    });
};
