const User = require('../../models/user');

const getUser = async (email) => {
  try {
    return User.getUser(email);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getUser;
