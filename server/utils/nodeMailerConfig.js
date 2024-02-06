require('dotenv').config();

module.exports = {
  // pool: true,
  // port: process.env.PORT,
  service: process.env.SERVICE,
  secure: process.env.NODE_ENV === 'production',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

