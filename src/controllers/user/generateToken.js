const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const generateToken = async (username, password) => {
  try {
    const user = await User.getUser(username);
    const secretKey = process.env.SECRET_KEY;
    let token;
    let userExists = false;

    if (!user) {
      return { token, userExists };
    }
    userExists = true;
    const hashedPassword = user.password;
    const isPasswordValid = await User.validatePassword(password, hashedPassword);

    if (!isPasswordValid) {
      return { token, userExists };
    }
    token = jwt.sign({ id: username }, secretKey, { expiresIn: 86400 });
    return { token, userExists };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = generateToken;
