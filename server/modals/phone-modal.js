const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    nicPictures: {
      type: [String],
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    imei: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['stolen', 'recovered'],
      default: 'stolen',
    },
    content: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
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
    dateRegistered: {
      type: Date,
      default: Date.now,
    },
    images: {
      type: [String],
      default: [],
    },
    comments: {
      type: [Object],
      default: [],
      ref: 'Comment',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('phone', phoneSchema);
