const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    owner: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      profilePicture: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    phone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Phone',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('comment', commentSchema);
