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
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  return isPasswordValid;
};

userSchema.statics.getUser = async (username) => {
  const user = await userModel.findOne({ username }).exec();
  return user;
};


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
