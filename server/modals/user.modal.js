const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'plz provide email'],
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, 'plz provide email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'plz provide password'],
    },
    confirmPassword: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: 'https://cdn2.iconfinder.com/data/icons/rcons-users-color/32/boy-512.png',
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    status: {
      type: String,
      default: 'Active',
    },
    passwordToken: {
      type: String,
    },
    passwordTokenExpirationDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

module.exports = mongoose.model('user', userSchema);
