const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const JWT_SECRET = require('../../utils/config');

const generateToken = async (username, password) => {
  try {
    const user = await User.getUser(username);

    if (!user) {
      throw new Error('The user is not registered');
    }
    const hashedPassword = user.password;
    const isPasswordValid = await User.validatePassword(password, hashedPassword);

    if (!isPasswordValid) {
      throw new Error('Password is incorrect');
    }
    // if user exists and has entered right password, sign the token
    const token = jwt.sign({ id: username }, JWT_SECRET, { expiresIn: 86400 });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = generateToken;
