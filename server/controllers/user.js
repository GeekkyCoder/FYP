const User = require('../modals/user.modal');
const { StatusCodes } = require('http-status-codes');
const { errorResponse } = require('../utils/errResponse');
const bcrypt = require('bcryptjs');
const attachCookiesToResponse = require('../utils/attachCookiesToResponse');

const register = async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;

  if (!userName || !email || !password || !confirmPassword) {
    return errorResponse(res, 400, 'plz provide information! inavlid credentials');
  }

  const userAlreadyExist = await User.findOne({ email });

  if (userAlreadyExist) {
    return errorResponse(res, 400, 'user already exist');
  }

  if (password !== confirmPassword) {
    return errorResponse(res, 400, 'password does not match');
  }

  const role = (await User.countDocuments({})) === 0 ? 'admin' : 'user';

  const user = await User.create({ userName, email, password, role });

  const tokenUser = {
    userId: user?._id,
    userName: user?.userName,
    role,
  };

  const userFound = {
    userName: user.userName,
    profilePicture: user?.profilePicture,
    email: user?.email,
  };

  attachCookiesToResponse(res, tokenUser, userFound);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, 400, 'plz provide email and password');
  }

  const userFound = await User.findOne({ email });

  if (!userFound) {
    return errorResponse(res, 401, 'invalid credentials');
  }

  const isPasswordMatch = await bcrypt.compare(password, userFound?.password);
  // await bcrypt.compare(candidatePassword,this.password)

  if (!isPasswordMatch) {
    return errorResponse(res, 400, 'wrong passoword ! invalid credentials');
  }

  const tokenUser = { userId: userFound?._id, role: userFound.role, userName: userFound?.userName };

  const user = {
    userName: userFound.userName,
    profilePicture: userFound?.profilePicture,
    email: userFound?.email,
  };

  attachCookiesToResponse(res, tokenUser, user);
};

const getCurrentUser = async (req, res) => {
  const foundUser = await User.findOne({ _id: req.user.userId }, '-password');
  if (!foundUser) {
    return errorResponse(res, 401, 'user does not exist');
  }

  return res.status(200).json({ user: foundUser });
};

const logOut = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json('logged out successfully!');
};

module.exports = {
  register,
  login,
  logOut,
  getCurrentUser,
};
