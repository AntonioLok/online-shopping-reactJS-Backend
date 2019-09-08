const Product = require('../../models/product');

const getProduct = async (id) => {
  try {
    return Product.getProduct(id);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getProduct;
