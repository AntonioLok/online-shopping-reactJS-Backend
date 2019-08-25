/* eslint-disable max-len */
const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  username: { type: String, required: true },
  // object of dynamic keys. As shown in the sample below, 1 is the productId.
  // Cannot define dynamic keys in mongo schema
  products: { type: Object, default: {} },
}, { minimize: false }); // {1: {sizeSelected: 's', amount: 3 }, {sizeSelected: 'm', amount: 6 },..},

cartSchema.statics.getCart = async (username) => {
  const cart = await cartModel.findOne({ username }).exec();

  return cart;
};

cartSchema.statics.updateCart = async (username, updatedProducts) => {
  const newProductList = { $set: { products: updatedProducts } };
  cartModel.updateOne({ username }, newProductList).exec();
};

const cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;
