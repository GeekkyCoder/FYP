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

  attachCookiesToResponse(res, tokenUser);
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

  attachCookiesToResponse(res, tokenUser);
};

module.exports = {
  register,
  login,
};
