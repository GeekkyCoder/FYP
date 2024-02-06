const { StatusCodes } = require('http-status-codes');
const { errorResponse } = require('../utils/errResponse');
const Phone = require('../modals/phone-modal');
const Comment = require('../modals/comments.modal');
const User = require('../modals/user.modal');
const checkPermission = require('../middlewares/check-auth');
const { checkImei } = require('../utils/checkImei');
const { phoneInfo } = require('../utils/phoneInfo');
const sendEmail = require('../utils/sendEmail');

async function addNewPhoneEntry(req, res) {
  const { imei, content, address, nicPictures } = req.body;

  if (!checkImei(imei)) {
    return errorResponse(res, 404, 'please provide valid IMEI Number');
  }

  if (!imei || !address || !content) {
    return errorResponse(res, 400, 'please provide field values');
  }

  const { imeiCode, brandName, deviceName, modelName } = await phoneInfo(imei);

  const user = await User.findOne({ _id: req?.user?.userId });

  try {
    const alreadyExist = await Phone.findOne({ imei: req?.body?.imei });

    if (alreadyExist) return errorResponse(res, 400, 'this phone is already registered');

    //add new entry
    const phone = await Phone.create({
      ...req.body,
      imei: imeiCode,
      brand: brandName,
      model: modelName ? modelName : deviceName,
      nicPictures,
      owner: {
        userId: user?._id,
        name: user?.userName,
        email: user?.email,
        profilePicture: user?.profilePicture,
        role: user?.role,
      },
    });

    const html = ` <div class="container">
    <h2>Phone Verification</h2>
    <p>Hello Admin,</p>
    <p>Please verify the post by clicking the link below:</p>
    <p><a href="https://fyp-theta-seven.vercel.app/post/${phone._id}?name=${phone.model}" style="display: inline-block; padding: 10px 20px; background-color: #4caf50; color: #ffffff; text-decoration: none; border-radius: 3px;">Verify Post</a></p>
    <p>Thank you!</p>
</div>`;

    await sendEmail({
      to: 'farazahmedk955@gmail.com',
      subject: 'Verify the post',
      html,
      from: user.email,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: `mobile with IMEI:${phone?.imei} registered!!` });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err?.message });
  }
}

async function getAllVerifiedPhones(req, res) {
  const phones = await Phone.find({
    verified: true,
  });
  return res.status(StatusCodes.OK).json({ phones });
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

  if (!checkImei(imei)) {
    return errorResponse(res, 404, 'invalid IMEI');
  }

  if (!imei.length) {
    return errorResponse(res, 404, 'please provide imei 15 digits of phone');
  }

  //look for phone in db
  const foundPhone = await Phone.findOne({ imei });

  if (!foundPhone) {
    return errorResponse(res, 404, `this IMEI is not registered in our site`);
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

const getPhoneStatusCounts = async (req, res) => {
  try {
    const result = await Phone.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const counts = {
      stolen: 0,
      recovered: 0,
    };

    result.forEach((item) => {
      if (item._id === 'stolen') {
        counts.stolen = item.count;
      } else if (item._id === 'recovered') {
        counts.recovered = item.count;
      }
    });

    return res.status(200).json({ counts });
  } catch (error) {
    console.error('Error in aggregation:', error);
    throw error;
  }
};

const getPhone = async (req, res) => {
  const { phoneId } = req.query;

  const phone = await Phone.findOne({ _id: phoneId });

  if (!phone) {
    return errorResponse(res, 404, 'phone not found');
  }

  const phoneObj = {
    id: phone?._id,
    userName: phone?.owner.name,
    model: phone?.model,
    date: phone?.dateRegistered,
    status: phone?.verified,
    link: `http://localhost:5173/post/${phone?._id}?name=${phone?.model}`,
    nicPictures: phone.nicPictures,
    images: phone.images,
  };

  return res.status(200).json({ phone: phoneObj });
};

const verifyPhone = async (req, res) => {
  const { phoneId } = req.body;

  const phone = await Phone.findOne({ _id: phoneId });

  if (!phone) {
    return errorResponse(res, 404, 'phone not found');
  }

  if (phone.verified) {
    return errorResponse(res, 404, 'phone already verified');
  }

  await Phone.findOneAndUpdate({ _id: phone._id }, { verified: true }, { upsert: true });

  res.status(200).json({ msg: 'phone verified successfully' });
};

const sendEmailForRequest = async (req, res) => {
  const { userEmail, content } = req.body;

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return errorResponse(res, 404, 'user does not exist');
  }

  await sendEmail({
    to: userEmail,
    subject: 'queries',
    html: content,
    from: 'farazahmedk955@gmail.com',
  });

  return res.status(200).json({ msg: 'email sent successfully' });
};

module.exports = {
  addNewPhoneEntry,
  getAllPhones,
  getUserPhones,
  getCommentsOfPhone,
  sendEmailForRequest,
  deletePhone,
  updatePhone,
  showPhoneStatus,
  getPhoneStatusCounts,
  getAllVerifiedPhones,
  getPhone,
  verifyPhone,
};
