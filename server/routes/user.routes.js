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
  verifyEmail,
  getUserFeedBack,
  forgotPassword,
  resetPassword,
  getTotalUsersLength,
} = require('../controllers/user');

const userRouter = require('express').Router();

userRouter.post('/auth/login', login);
userRouter.post('/auth/register', register);
userRouter.get('/current-user', authMiddleware, getCurrentUser);
userRouter.delete('/auth/log-out', logOut);
userRouter.put('/update-user', authMiddleware, updateUser);
userRouter.get('/all-users', getAllUsers);
userRouter.delete('/delete-user', [authMiddleware, authorize('admin')], deleteUser);
userRouter.post('/auth/verify-email', authMiddleware, verifyEmail);
userRouter.post('/feedback', authMiddleware, getUserFeedBack);
userRouter.post('/forget-password', forgotPassword);
userRouter.post('/reset-password', resetPassword);
userRouter.get("/total-users", getTotalUsersLength)
module.exports = {
  userRouter,
};
