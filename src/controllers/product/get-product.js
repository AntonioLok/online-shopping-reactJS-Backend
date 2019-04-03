const Product = require('../../models/product');

const getProduct = async (id) => {
  try {
    const product = await Product.getProduct(id);
    return product;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getProduct;
