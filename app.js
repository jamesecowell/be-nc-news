const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter');
const { errors } = require('./errors/errors');
const { send405Error, route404Error } = require('./errors/errors');

app.use(express.json());

app.use('/api', apiRouter);

app.get('/*', route404Error);

app.all('/*', send405Error);

module.exports = app;
