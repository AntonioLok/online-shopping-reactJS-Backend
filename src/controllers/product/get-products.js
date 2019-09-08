const Product = require('../../models/product');

const getProducts = async (section, type) => {
  try {
    return Product.getProducts(section, type);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getProducts;
