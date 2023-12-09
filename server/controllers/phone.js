const { StatusCodes } = require('http-status-codes');
const { errorResponse } = require('../utils/errResponse');
const Phone = require('../modals/phone-modal');
const User = require("../modals/user.modal")

async function addNewPhoneEntry(req, res) {
  const { imei, brand, model, description } = req.body;

  if ((!imei || !brand, !model, !description)) {
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
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'internal server error 500' });
  }
}

module.exports = {
  addNewPhoneEntry,
};
