const User = require('../../models/user');
const constants = require('../../constants');

const {
  AUTH__USER_DOES_NOT_EXIST,
} = constants.errorCodes;

const getUser = async (username) => {
  try {
    const user = await User.getUser({ username });

    if (!user) {
      throw new Error(AUTH__USER_DOES_NOT_EXIST);
    }

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getUser;
