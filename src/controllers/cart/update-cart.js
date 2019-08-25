const Cart = require('../../models/cart');

const updateCart = async (userId, updatedProducts) => {
  try {
    const cart = await Cart.updateCart(userId, updatedProducts);

    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = updateCart;
