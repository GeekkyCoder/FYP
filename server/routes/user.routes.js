const authMiddleware = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');
const {
  login,
  register,
  getCurrentUser,
  logOut,
  updateUser,
  getAllUsers,
  deleteUser,
} = require('../controllers/user');

const userRouter = require('express').Router();

userRouter.post('/auth/login', login);
userRouter.post('/auth/register', register);
userRouter.get('/current-user', authMiddleware, getCurrentUser);
userRouter.delete('/auth/log-out', authMiddleware, logOut);
userRouter.put('/update-user', authMiddleware, updateUser);
userRouter.get('/all-users', getAllUsers);
userRouter.delete('/delete-user', [authMiddleware, authorize('admin')], deleteUser);
module.exports = {
  userRouter,
};
