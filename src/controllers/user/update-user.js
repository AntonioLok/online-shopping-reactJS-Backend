const User = require('../../models/user');

const updateUser = async (username, ...fields) => {
  try {
    User.updateUser(username, ...fields);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = updateUser;
