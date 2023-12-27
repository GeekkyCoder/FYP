const Phone = require('../modals/phone-modal');
const Comment = require('../modals/comments.modal');
const User = require('../modals/user.modal');
const { errorResponse } = require('../utils/errResponse');
const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');

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
