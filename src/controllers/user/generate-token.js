const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const JWT_SECRET = require('../../utils/config');
const constants = require('../../constants');

const {
  AUTH__EMAIL_DOES_NOT_EXIST,
  AUTH__PASSWORD_DOES_NOT_MATCH,
} = constants.errorCodes;

const generateToken = async (username, password) => {
  try {
    const user = await User.getUser(username);

    if (!user) {
      throw new Error(AUTH__EMAIL_DOES_NOT_EXIST);
    }
    const hashedPassword = user.password;
    const isPasswordValid = await User.validatePassword(password, hashedPassword);

    if (!isPasswordValid) {
      throw new Error(AUTH__PASSWORD_DOES_NOT_MATCH);
    }
    // if user exists and has entered right password, sign the token
    const token = jwt.sign({ id: username }, JWT_SECRET, { expiresIn: 86400 });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = generateToken;
