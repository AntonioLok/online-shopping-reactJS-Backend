const User = require('../../models/user');
const constants = require('../../constants');

const {
  AUTH__EMAIL_ALREADY_IN_USE,
} = constants.errorCodes;

const { duplicationKey } = constants.mongoResponse.error;

const register = async (username, password) => {
  try {
    const newUser = new User();
    newUser.username = username;
    newUser.password = await User.generatePasswordHash(password);

    await newUser.save();
  } catch (error) {
    if (error.code === duplicationKey.CODE) {
      throw new Error(AUTH__EMAIL_ALREADY_IN_USE);
    }
    throw new Error(error);
  }
};

module.exports = register;
