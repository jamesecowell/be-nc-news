exports.errors = (err, req, res, next) => {
  console.log(err);
  const errors = {
    noUser: { status: 404, msg: 'User not found' }
  };
  if (err in errors) {
    res.status(errors[err].status).send({ msg: errors[err].msg });
  } else {
    res.status(500).send('Internal error');
  }
};
