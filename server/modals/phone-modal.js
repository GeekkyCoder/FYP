const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    imei: {
      type: String,
      required: true,
      unique: true,
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
    description: {
      type: String,
      default: '',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('phone', phoneSchema);