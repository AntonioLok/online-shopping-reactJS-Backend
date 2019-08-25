const Cart = require('../../models/cart');

const getCart = async (userId) => {
  try {
    const cart = await Cart.getCart(userId);

    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getCart;
