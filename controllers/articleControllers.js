const {
  selectArticleById,
  amendArticle,
  selectArticles
} = require('../models/articleModels');
const { addComment, getComments } = require('../models/commentModels');

exports.getArticleById = (req, res, next) => {
  selectArticleById(req.params)
    .then(article => {
      res.status(200).send(article[0]);
    })
    .catch(err => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  selectArticles(req.query).then(articles => {
    res.status(200).send(articles);
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

exports.postArticleComment = (req, res, next) => {
  addComment(req.params, req.body).then(newComment => {
    res.status(201).send(newComment[0]);
  });
};

exports.getArticleComments = (req, res, next) => {
  getComments(req.params, req.query)
    .then(comments => {
      res.status(200).send(comments);
    })
    .catch(err => {
      next(err);
    });
};
