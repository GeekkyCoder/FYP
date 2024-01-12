require('dotenv').config();

module.exports = {
  service: process.env.SERVICE,
  port: process.env.HOST_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};
