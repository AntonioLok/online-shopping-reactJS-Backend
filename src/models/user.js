const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true, dropDups: true } },
  password: { type: String, required: true },
});

userSchema.statics.generatePasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

userSchema.statics.validatePassword = async (password, hashedPassword) => {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.statics.getUser = async (username) => {
  try {
    return userModel.findOne({ username }).exec();
  } catch (error) {
    throw new Error(error);
  }
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
