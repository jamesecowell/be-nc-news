exports.errors = (err, req, res, next) => {
  const errors = {
    noUser: { status: 404, msg: 'User not found' },
    noArticle: { status: 404, msg: 'Article not found' }
  };
  if (err in errors) {
    res.status(errors[err].status).send({ msg: errors[err].msg });
  } else {
    console.log(err);
    res.status(500).send('Internal error');
  }
};
