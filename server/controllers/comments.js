const Phone = require('../modals/phone-modal');
const Comment = require('../modals/comments.modal');
const User = require('../modals/user.modal');
const { errorResponse } = require('../utils/errResponse');
const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');
const sendEmail = require('../utils/sendEmail');

async function createComment(req, res) {
  const { comment } = req.body;

  const { phoneId } = req.query;

  if (!comment?.length) {
    return errorResponse(res, 404, 'add your comment!!');
  }

  // who is going to post this comment
  const user = await User?.findOne({ _id: req.user?.userId });

  if (!user) {
    return errorResponse(res, 401, 'not authorized!!');
  }

  const phone = await Phone?.findOne({ _id: phoneId });

  const userWhoPostedEmail = await User.findOne({ _id: phone.owner.userId });

  // const origin = 'http://localhost:5173/phone';
  const origin = "https://fyp-theta-seven.vercel.app/phone"

  const html = ` <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2>New Comment On Your Post, Model:${phone?.model}</h2>
  <p>Hello ${userWhoPostedEmail.userName},</p>
  <p>${user.userName} has addded a comment on your post ${phone?.model}</p>
  <p>${comment}</p>
  <div style="text-align: center; margin-top: 20px;">
      <a href="${origin}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none;">View Here</a>
  </div>
  <p>Thank you</p>
  <p>Hope You having a good day!!</p>
</div>`;

  await sendEmail({
    subject: `Update On Your Post ${phone?.model}`,
    to: userWhoPostedEmail.email,
    from: { email: user?.email,hasComment:true },
    html,
  });

  if (!phone) {
    return errorResponse(res, 404, `could not find phone with id ${phone?._id}`);
  }

  // create comment
  const newComment = await Comment.create({
    phone: phone?._id,
    comment,
    owner: {
      userId: user?._id,
      email: user?.email,
      name: user?.userName,
      profilePicture: user?.profilePicture,
      role: user?.role,
    },
  });

  await Phone.updateOne({ _id: phoneId }, { $push: { comments: newComment } });

  return res.status(StatusCodes.CREATED).json({ msg: `comment posted`, comment: newComment });
}

async function deleteComment(req, res) {
  const commentId = req.query.commentId;
  const phoneId = req.query.phoneId;

  //find the phone
  const phone = await Phone.findOne({ _id: phoneId });
  const comment = await Comment.findOne({ _id: commentId });

  if (!phone) {
    return errorResponse(res, 404, `phone not found`);
  }

  if (!comment) {
    return errorResponse(res, 404, 'comment does not exist');
  }

  await Comment.findByIdAndDelete(commentId);

  return res.status(200).json({ msg: 'comment deleted' });
}

module.exports = {
  createComment,
  deleteComment,
};
