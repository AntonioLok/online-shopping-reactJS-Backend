const User = require('../../models/user');
const constants = require('../../constants');

const {
  AUTH__EMAIL_DOES_NOT_EXIST,
  AUTH__PASSWORD_RESET_LINK_INVALID_OR_EXPIRED,
} = constants.errorCodes;

const getUser = async (...fields) => {
  try {
    const user = await User.getUser(...fields);
    if (!user) {
      if (Object.keys(...fields).includes('resetPasswordToken')) {
        throw new Error(AUTH__PASSWORD_RESET_LINK_INVALID_OR_EXPIRED);
      } else {
        throw new Error(AUTH__EMAIL_DOES_NOT_EXIST);
      }
    }

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getUser;
