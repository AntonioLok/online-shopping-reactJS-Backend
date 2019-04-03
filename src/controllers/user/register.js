const User = require('../../models/user');

const register = async (username, password) => {
  try {
    const newUser = new User();
    newUser.username = username;
    newUser.password = await User.generatePasswordHash(password);

    return await newUser.save().then(user => user);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = register;
