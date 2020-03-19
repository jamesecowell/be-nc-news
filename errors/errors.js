exports.errors = (err, req, res, next) => {
  const errors = {
    noUser: { status: 404, msg: 'User not found' },
    noArticle: { status: 404, msg: 'Article not found' },
    noComment: { status: 404, msg: 'Comment not found' },
    badRequest: { status: 400, msg: 'Bad request' }
  };
  const psqlCodes = ['22P02'];
  if (err in errors) {
    res.status(errors[err].status).send({ msg: errors[err].msg });
  } else if (psqlCodes.includes(err.code)) {
    res.status(400).send({ msg: 'Bad request' });
  } else {
    console.log(err);
    res.status(500).send('Internal error');
  }
};
