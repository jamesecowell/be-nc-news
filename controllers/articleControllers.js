const { selectArticles, amendArticle } = require('../models/articleModels');

exports.getArticles = (req, res, next) => {
  selectArticles(req.params)
    .then(article => {
      res.status(200).send(article[0]);
    })
    .catch(err => {
      next(err);
    });
};

exports.patchArticles = (req, res, next) => {
  amendArticle(req.params, req.body)
    .then(patchedArticle => {
      res.status(200).send(patchedArticle[0]);
    })
    .catch(err => {
      next(err);
    });
};
