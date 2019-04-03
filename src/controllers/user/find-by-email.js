const User = require('../../models/user');

const findByEmail = async (email) => {
  try {
    const userEmail = await User.findByEmail(email);
    return userEmail;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = findByEmail;
