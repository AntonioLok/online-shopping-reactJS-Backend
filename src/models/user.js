/* eslint-disable consistent-return */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true, dropDups: true } },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

userSchema.pre('save', async function (next) {
  try {
    const user = this;

    if (!user.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    if (user.resetPasswordToken) {
      user.resetPasswordExpires = new Date();
    }
    next();
  } catch (error) {
    throw new Error(error);
  }
});


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
