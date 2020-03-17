const { selectUsers } = require('../models/userModels');

exports.getUsers = (req, res, next) => {
  selectUsers(req.params)
    .then(users => {
      res.status(200).send(users[0]);
    })
    .catch(err => {
      return next(err);
    });
};
