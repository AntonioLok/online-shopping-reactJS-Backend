const User = require('../../models/user');

const updateUser = async (username, ...fields) => {
  try {
    if (Object.keys(...fields).includes('password')) {
      const hashedPassword = await User.generatePasswordHash(fields[0].password);
      await User.updateUser(username, { ...fields[0], password: hashedPassword });
    } else {
      await User.updateUser(username, ...fields);
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = updateUser;
