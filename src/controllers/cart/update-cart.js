const Cart = require('../../models/cart');

const updateCart = async (userId, updatedProducts) => {
  try {
    return Cart.updateCart(userId, updatedProducts);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = updateCart;
