const router = require('express').Router();
const getCart = require('../../controllers/cart/get-cart');
const updateCart = require('../../controllers/cart/update-cart');
const responseHandler = require('../../utils/response-handler');
const constants = require('../../constants');
const getTokenFromheader = require('../../utils/middlewares/get-token-from-header');
const getDecodedToken = require('../../utils/middlewares/get-decoded-token');

const {
  error: {
    serverError,
  },
  success: {
    success,
  },
} = constants.httpResponse;

router.post('/', [getTokenFromheader, getDecodedToken], async (req, res) => {
  try {
    const userId = req.decodedToken.id;
    const { updatedProducts } = req.body;
    await updateCart(userId, updatedProducts);

    const cart = await getCart(userId);

    responseHandler.handleSuccess(res, success.CODE, cart.products);
  } catch (error) {
    responseHandler.handleError(res, serverError.CODE);
  }
});


router.get('/', [getTokenFromheader, getDecodedToken], async (req, res) => {
  try {
    const userId = req.decodedToken.id;
    const cart = await getCart(userId);

    responseHandler.handleSuccess(res, success.CODE, cart.products);
  } catch (error) {
    responseHandler.handleError(res, error);
  }
});


module.exports = router;
