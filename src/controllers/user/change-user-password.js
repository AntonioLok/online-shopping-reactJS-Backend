const User = require('../../models/user');
const constants = require('../../constants');

const {
  AUTH__PASSWORD_RESET_LINK_INVALID_OR_EXPIRED,
} = constants.errorCodes;

const changeUserPassword = async (username, password, resetPasswordToken) => {
  try {
    const user = await User.getUser({
      username,
      resetPasswordToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new Error(AUTH__PASSWORD_RESET_LINK_INVALID_OR_EXPIRED);
    }

    user.password = password;
    user.save();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = changeUserPassword;
