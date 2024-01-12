require('dotenv').config();

module.exports = {
    host:process.env.SERVICE,
    port:process.env.PORT_HOST,
//   service: process.env.SERVICE,
//   port: process.env.HOST_PORT,
//   secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};
