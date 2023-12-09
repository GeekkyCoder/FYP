const User = require('../modals/user.modal');
const { StatusCodes } = require('http-status-codes');
const { errorResponse } = require('../utils/errResponse');
const bcrypt = require('bcryptjs');
const attachCookiesToResponse = require('../utils/attachCookiesToResponse');
const checkPermission = require('../middlewares/check-auth');

const register = async (req, res) => {
  const { userName, email, password, confirmPassword, profilePicture } = req.body;

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

  const user = await User.create({ userName, email, password, role, profilePicture });

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
    return errorResponse(res, 401, 'account does not exist');
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
    role: userFound?.role,
  };

  attachCookiesToResponse(res, tokenUser, user);
};

const getCurrentUser = async (req, res) => {
  const foundUser = await User.findOne({ _id: req.user.userId }, '-password');
  if (!foundUser) {
    // return errorResponse(res, 401, 'user does not exist');
    throw new Error('something went wrong');
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

const updateUser = async (req, res) => {
  const foundUser = await User.findOne({ _id: req.user?.userId });

  if (!foundUser) {
    throw Error('user not found');
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user?.userId },
    { ...req.body },
    { upsert: true, new: true }
  );

  if (!checkPermission(req?.user, foundUser._id?.toString()))
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'you can not access this route' });

  const user = {
    userName: updatedUser.userName,
    profilePicture: updatedUser?.profilePicture,
    email: updatedUser?.email,
    role: updatedUser?.role,
  };

  res.status(StatusCodes.OK).json({ status: 'success', msg: 'user updated successfully', user });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(StatusCodes.OK).json({ users });
  } catch (err) {
    res.status(500).json({ msg: 'failed to fetch users' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.query;

  const foundUser = await User.findOne({ _id: id });

  if (!foundUser) return res.status(StatusCodes.NOT_FOUND).json({ msg: 'user does not exist' });

  try {
    //cant delete theirself as well
    const himSelf = await User.findOne({ _id: req.user.userId });

    if (himSelf?._id.toString() === id)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: 'cant not delete yourself, only admin can perform this action' });

    if (!checkPermission(req.user, id))
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'permission denied' });
    await User.findOneAndDelete({ _id: id });
    res.status(StatusCodes.OK).json({ msg: `deleted account ${foundUser.userName}` });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  register,
  login,
  logOut,
  updateUser,
  getCurrentUser,
  getAllUsers,
  deleteUser,
};
