exports.errors = (err, req, res, next) => {
  const errors = {
    noUser: { status: 404, msg: 'User not found' },
    noArticle: { status: 404, msg: 'Article not found' },
    noComment: { status: 404, msg: 'Comment not found' },
    noTopic: { status: 404, msg: 'Topic not found' },
    noAuthor: { status: 404, msg: 'Author not found' },
    badMethod: { status: 405, msg: 'Method not allowed' },
    badRequest: { status: 400, msg: 'Bad request' }
  };

  const psqlCodes = ['22P02', '42703', '23503', '23502'];

  if (err in errors) {
    res.status(errors[err].status).send({ msg: errors[err].msg });
  } else if (psqlCodes.includes(err.code)) {
    res.status(400).send({ msg: 'Bad request' });
  } else {
    console.log(err);
    res.status(500).send('Internal error');
  }
};

exports.send405Error = (req, res, next) => {
  res.status(405).send({ msg: 'Method not allowed' });
};

exports.route404Error = (req, res, next) => {
  res.status(404).send({ msg: 'Route not found' });
};
