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

productSchema.statics.getProduct = id => productModel.find({ _id: id })
  .exec()
  .then(product => product);

productSchema.statics.getProducts = (section, type) => productModel.find({ section, type })
  .exec()
  .then(products => products);

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
