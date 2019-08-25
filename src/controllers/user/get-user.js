const User = require('../../models/user');

const getUser = async (email) => {
  try {
    const user = await User.getUser(email);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getUser;
