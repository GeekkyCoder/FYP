const { StatusCodes } = require('http-status-codes');
const { errorResponse } = require('../utils/errResponse');
const Phone = require('../modals/phone-modal');
const Comment = require('../modals/comments.modal');
const User = require('../modals/user.modal');
const checkPermission = require('../middlewares/check-auth');

async function addNewPhoneEntry(req, res) {
  const { imei, brand, model, content, address } = req.body;

  if ((!imei || !brand, !model|| !address || !content)) {
    return errorResponse(res, 400, 'please provide field values');
  }

  const user = await User.findOne({ _id: req?.user?.userId });

  try {
    const alreadyExist = await Phone.findOne({ imei: req?.body?.imei });

    if (alreadyExist) return errorResponse(res, 400, 'this phone is already registered');

    //add new entry
    const phone = await Phone.create({
      ...req.body,
      owner: {
        userId: user?._id,
        name: user?.userName,
        email: user?.email,
        profilePicture: user?.profilePicture,
        role: user?.role,
      },
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: `mobile with IMEI:${phone?.imei} registered!!` });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err?.message });
  }
}

async function getAllPhones(req, res) {
  const phones = await Phone.find({});
  return res.status(StatusCodes.OK).json({ phones });
}

//phoneId query
async function deletePhone(req, res) {
  const { phoneId } = req?.query;
  const phone = await Phone?.findOne({ _id: phoneId });

  const phoneCreatedByUser = phone?.owner?.userId?.toString();

  if (!(phoneCreatedByUser === req?.user?.userId)) {
    return errorResponse(res, 404, 'you are not allowed to delete this phone');
  }

  if (!checkPermission(req?.user, phoneCreatedByUser))
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'you can not access this route' });

  await Phone?.deleteOne({ _id: phoneId });
  await Comment?.deleteMany({ phone: phoneId });

  res.status(StatusCodes.OK).json({ msg: `deleted phone with imei ${phone?.imei}` });
}

async function updatePhone(req, res) {
  const { phoneId } = req?.query;

  const { status } = req.body;

  if (!status?.length) {
    return errorResponse(res, 404, 'status is required field');
  }

  //find phon  created by loggged in user
  const phone = await Phone?.findOne({ _id: phoneId });

  const userOfPhone = phone?.owner?.userId?.toString();

  if (!checkPermission(req?.user, userOfPhone)) {
    return errorResponse(res, 401, 'you are not allowed to update someone information');
  }

  const updatedPhone = await Phone?.findOneAndUpdate({ _id: phoneId }, req.body, {
    upsert: true,
    new: true,
  });

  return res
    .status(StatusCodes.CREATED)
    .json({ msg: `updated information of phone with imei ${phone?.imei}`, phone: updatedPhone });
}

async function getCommentsOfPhone(req, res) {
  const { phoneId } = req.query;
  if (!phoneId) {
    return errorResponse(res, 404, 'could not locate phone');
  }

  const comments = await Comment?.find({ phone: phoneId });

  res.status(StatusCodes.OK).json({ comments });
}

async function showPhoneStatus(req, res) {
  const { imei } = req.body;

  if (!imei.length) {
    return errorResponse(res, 404, 'please provide imei 15 digits of phone');
  }

  //look for phone in db
  const foundPhone = await Phone.findOne({ imei });

  if (!foundPhone) {
    return errorResponse(res, 404, `incorrect imei or might not be registered in our site`);
  }

  //found the phone
  return res.status(200).json({ phone: foundPhone });
}

async function getUserPhones(req, res) {
  const findUser = await User.findOne({ _id: req?.user?.userId });

  if (!findUser) {
    return errorResponse(res, 401, 'user does not exist');
  }

  //find his/her phones
  const phonesOfUser = await Phone.find({ 'owner.userId': req?.user?.userId });

  return res.status(StatusCodes.OK).json({ phones: phonesOfUser });
}

module.exports = {
  addNewPhoneEntry,
  getAllPhones,
  getUserPhones,
  getCommentsOfPhone,
  deletePhone,
  updatePhone,
  showPhoneStatus,
};
