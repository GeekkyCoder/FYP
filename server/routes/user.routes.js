const authMiddleware = require('../middlewares/authMiddleware');
// const authorize = require('../middlewares/authorize');
const { login, register, getCurrentUser, logOut } = require('../controllers/user');

const userRouter = require('express').Router();

userRouter.post('/auth/login', login);
userRouter.post('/auth/register', register);
userRouter.get('/current-user', authMiddleware, getCurrentUser);
userRouter.delete('/auth/log-out', authMiddleware, logOut);

module.exports = {
  userRouter,
};
