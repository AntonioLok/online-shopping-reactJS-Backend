const nodemailer = require('nodemailer');
const crypto = require('crypto');
const getUser = require('../user/get-user');
const updateUser = require('../user/update-user');
const { WEB_APP_BASE_URL } = require('../../settings');

const sendRecoveryEmail = async (username) => {
  try {
    await getUser({ username });

    const token = crypto.randomBytes(20).toString('hex');
    const { NODEMAILER_TRANSPORTER_USERNAME, NODEMAILER_TRANSPORTER_PASSWORD } = process.env;

    await updateUser(username, {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000, // 3600000 ms = 1 hour
    });

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: NODEMAILER_TRANSPORTER_USERNAME,
        pass: NODEMAILER_TRANSPORTER_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'donotreply <os.recovery.pw@gmail.com>',
      to: username,
      subject: 'Link To Reset Password',
      text:
          'You are receiving this because you have requested the reset of the password for your account.\n\n'
          + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
          + `${WEB_APP_BASE_URL}/reset-password/${token}\n\n`
          + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendRecoveryEmail;
