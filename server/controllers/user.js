const User = require('../modals/user.modal');
const { StatusCodes } = require('http-status-codes');
const { errorResponse } = require('../utils/errResponse');
const bcrypt = require('bcryptjs');
const attachCookiesToResponse = require('../utils/attachCookiesToResponse');
const checkPermission = require('../middlewares/check-auth');
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const sendEmail = require('../utils/sendEmail');

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

  // let origin = "http://localhost:5173"
  let origin = "https://fyp-theta-seven.vercel.app"

  await sendVerificationEmail({
    name: userFound.userName,
    email: userFound.email,
    origin,
  });

  attachCookiesToResponse(res, tokenUser, userFound);
};

const verifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return errorResponse(res, 401, 'user does not exist');
  }

  if (user.isVerified) {
    return errorResponse(res, 401, 'account already verified');
  }

  await User.findOneAndUpdate({ email }, { isVerified: true }, { upsert: true });

  return res.status(200).json({ status: 200, msg: 'account verified!!' });
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

  if (!userFound.isVerified) {
    return errorResponse(res, 404, 'please verify your email');
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
    sameSite:"none"
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
    const users = await User.find({isVerified:true}).select('-password');
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

const getUserFeedBack = async (req, res) => {
  const { Email, Message } = req.body;

  const user = await User.findOne({email:Email})

  if(!user) {
    return errorResponse(res,404,"please create your account first")
  }

  if (!Email.length || !Message.length) {
    return errorResponse(res, 404, 'please provdide email and message');
  }

  //send email
  const message = ` <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
   <h2>Feeback from User</h2>
   <p>${Message}</p>
 </div>`;

  await sendEmail(
    { html: message, subject: 'Feedback from user', to: 'farazahmedk955@gmail.com',from:{email:user?.email,hasComment:false} }
  );
};

module.exports = {
  register,
  login,
  logOut,
  updateUser,
  getCurrentUser,
  getAllUsers,
  deleteUser,
  verifyEmail,
  getUserFeedBack
};
