const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  username: { type: String, required: true },
  products: [{
    _id: { type: String, required: true },
    size: { type: String, enum: ['S', 'M', 'L', 'XL'] },
    quantity: { type: Number, required: true },
  }],
}, { minimize: false });

cartSchema.statics.getCart = async (username) => {
  try {
    return cartModel.findOne({ username }).exec();
  } catch (error) {
    throw new Error(error);
  }
};

cartSchema.statics.updateCart = async (username, updatedProducts) => {
  try {
    const newProductList = { $set: { products: updatedProducts } };
    cartModel.updateOne({ username }, newProductList).exec();
  } catch (error) {
    throw new Error(error);
  }
};

const cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;
