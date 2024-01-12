const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodeMailerConfig');

const sendEmail = async ({ to, subject, html, from }) => {
  // let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  let fromUser = '';
  if (from?.email?.length) {
    fromUser = `'"Feeback"  <${from?.email}>'`;
  } else {
    fromUser = '"Phone Tracker" <readerblogs123@gmail.com>';
  }

  return transporter.sendMail({
    from: fromUser, // sender address
    to: to,
    subject,
    html,
  });
};

module.exports = sendEmail;