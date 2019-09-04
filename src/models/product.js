const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  section: { type: String, enum: ['Men', 'Women', 'Boys', 'Girls'], required: true },
  type: {
    type: String,
    enum: ['Shirts', 'Jeans', 'Pants', 'Jackets & Coats', 'Dresses', 'Knitwear', 'Tops',
      'Skirts', 'Shoes', 'Tops & T-shirts', 'Jumpsuits', 'Shorts'],
    required: true,
  },
  img: { type: String, required: true },
  sizeAvailable: { type: Array, required: true },
});

productSchema.statics.getProduct = async (id) => {
  try {
    return productModel.find({ _id: id }).exec();
  } catch (error) {
    throw new Error(error);
  }
};

productSchema.statics.getProducts = async (section, type) => {
  try {
    return productModel.find({ section, type }).exec();
  } catch (error) {
    throw new Error(error);
  }
};

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
