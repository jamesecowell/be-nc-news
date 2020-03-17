const userRouter = require('express').Router();
const { getUsers } = require('../controllers/userControllers');

userRouter.get('/:username', getUsers);

module.exports = userRouter;
