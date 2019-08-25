const User = require('../../models/user');
const Cart = require('../../models/cart');
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
    const newCart = new Cart({ username: newUser.username });

    await newUser.save();
    await newCart.save();
  } catch (error) {
    if (error.code === duplicationKey.CODE) {
      throw new Error(AUTH__EMAIL_ALREADY_IN_USE);
    }
    throw new Error(error);
  }
};

module.exports = register;
