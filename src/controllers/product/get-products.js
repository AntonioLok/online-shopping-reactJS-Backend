const Product = require('../../models/product');

const getProducts = async (section, type) => {
  try {
    const products = await Product.getProducts(section, type);
    return products;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getProducts;
