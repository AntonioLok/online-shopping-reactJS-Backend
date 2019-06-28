const router = require('express').Router();
const getProduct = require('../../controllers/product/get-product');
const getProducts = require('../../controllers/product/get-products');
const responseHandler = require('../../utils/response-handler');
const constants = require('../../constants');

const {
  error: {
    serverError,
  },
  success: {
    success,
  },
} = constants.httpResponse;

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProduct(id);

    responseHandler.handleSuccess(res, success.CODE, product[0]);
  } catch (error) {
    responseHandler.handleError(res, serverError.CODE);
  }
});

router.get('/:section/:type', async (req, res) => {
  try {
    const { section, type } = req.params;
    const products = await getProducts(section, type);

    responseHandler.handleSuccess(res, success.CODE, products);
  } catch (error) {
    responseHandler.handleError(res, serverError.CODE);
  }
});

module.exports = router;
