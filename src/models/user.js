const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true, dropDups: true } },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
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

userSchema.statics.getUser = async (...fields) => {
  try {
    return userModel.findOne(...fields).exec();
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.statics.updateUser = async (username, ...fields) => {
  try {
    const newFieldsValue = { $set: fields[0] };
    userModel.updateOne({ username }, newFieldsValue).exec();
  } catch (error) {
    throw new Error(error);
  }
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
