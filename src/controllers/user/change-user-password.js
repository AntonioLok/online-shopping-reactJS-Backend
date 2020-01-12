const User = require('../../models/user');
const constants = require('../../constants');

const {
  AUTH__PASSWORD_RESET_LINK_INVALID_OR_EXPIRED,
} = constants.errorCodes;

const changeUserPassword = async (username, password, resetPasswordToken, currentDate) => {
  try {
    const user = await User.getUser({
      username,
      resetPasswordToken,
      resetPasswordExpires: { $gt: currentDate },
    });

    if (!user) {
      throw new Error(AUTH__PASSWORD_RESET_LINK_INVALID_OR_EXPIRED);
    }

    const hashedPassword = await User.generatePasswordHash(password);
    User.updateUser(username, { password: hashedPassword, currentDate });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = changeUserPassword;
