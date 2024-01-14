const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodeMailerConfig');

const sendEmail = async ({ to, subject, html, from }) => {
  // let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  let fromUser = '';
  if (from?.email && from?.hasComment) {
    fromUser = `"Comment" <${from?.email}>`;
  } else if (from?.email) {
    fromUser = `"Feeback"  <${from?.email}>`;
  } else if (!from?.email && from?.resetPassword) {
    fromUser = `"Reset Password"  <farazahmedk955@gmail.com>`;
  } else {
    fromUser = '"Phone Tracker" <farazahmedk955@gmail.com>';
  }

  return transporter.sendMail({
    from: fromUser, // sender address
    to: to,
    subject,
    html,
  });
};

module.exports = sendEmail;
