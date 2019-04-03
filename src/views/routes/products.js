const router = require('express').Router();
const getProduct = require('../../controllers/product/get-product');
const getProducts = require('../../controllers/product/get-products');
const responseHandler = require('../../utils/response-handler');

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProduct(id);

    responseHandler.handleSuccess(res, 200, product[0]);
  } catch (error) {
    responseHandler.handleError(res, 500);
  }
});

router.get('/:section/:type', async (req, res) => {
  try {
    const { section, type } = req.params;
    const products = await getProducts(section, type);

    responseHandler.handleSuccess(res, 200, products);
  } catch (error) {
    responseHandler.handleError(res, 500);
  }
});

module.exports = router;
