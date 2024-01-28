require('dotenv').config();

module.exports = {
  pool: true,
  service: process.env.SERVICE,
  secure: process.env.NODE_ENV === 'production',
  port: process.env.PORT,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};
