const userRouter = require('express').Router();
const { getUsers } = require('../controllers/userControllers');
const { send405Error } = require('../errors/errors');

userRouter.get('/:username', getUsers);
userRouter.all('/:username', send405Error);

module.exports = userRouter;
