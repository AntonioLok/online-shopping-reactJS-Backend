const Cart = require('../../models/cart');

const getCart = async (userId) => {
  try {
    return await Cart.getCart(userId);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getCart;
