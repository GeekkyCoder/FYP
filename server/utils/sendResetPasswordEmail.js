const sendEmail = require('./sendEmail');

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const resetUrl = `${origin}?token=${token}&email=${email}`;

  const message = ` <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
   <h2>Reset Password</h2>
   <p>Hello ${name},</p>
   <p>Click the link below to reset your password</p>
   <p>link will expire after 10 minutes</p>
   <div style="text-align: center; margin-top: 20px;">
       <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none;">reset password</a>
   </div>
   <p>Hope you having a good day ${name} ☀</p>
   <p>Your phone tracker team 🙂</p>
 </div>`;

  await sendEmail({
    to: email,
    subject: 'Reset Password',
    html: message,
    from: { email: '', hasComment: false, resetPassword: true },
  });
};

module.exports = {
  sendResetPasswordEmail,
};
