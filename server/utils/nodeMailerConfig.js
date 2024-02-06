require('dotenv').config();

module.exports = {
  service: "gmail",
  secure: process.env.NODE_ENV === 'production',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

