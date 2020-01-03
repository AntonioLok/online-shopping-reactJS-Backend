const User = require('../../models/user');

const changeUserPassword = async (username, password, resetPasswordExpires) => {
  try {
    const hashedPassword = await User.generatePasswordHash(password);
    User.updateUser(username, { password: hashedPassword, resetPasswordExpires });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = changeUserPassword;
