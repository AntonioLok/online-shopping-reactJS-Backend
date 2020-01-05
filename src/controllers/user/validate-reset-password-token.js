const User = require('../../models/user');
const constants = require('../../constants');

const {
  AUTH__PASSWORD_RESET_LINK_INVALID_OR_EXPIRED,
} = constants.errorCodes;

const validateResetPasswordToken = async (username, resetPasswordToken, currentDate) => {
  try {
    const user = await User.getUser({
      username,
      resetPasswordToken,
      resetPasswordExpires: { $gt: currentDate },
    });

    if (!user) {
      throw new Error(AUTH__PASSWORD_RESET_LINK_INVALID_OR_EXPIRED);
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = validateResetPasswordToken;
