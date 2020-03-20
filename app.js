const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter');
const { errors } = require('./errors/errors');
const { send405Error } = require('./errors/errors');

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', send405Error);

module.exports = app;
