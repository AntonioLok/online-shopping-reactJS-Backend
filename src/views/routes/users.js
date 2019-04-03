const router = require('express').Router();
const findByEmail = require('../../controllers/user/find-by-email');
const registerUser = require('../../controllers/user/register');
const responseHandler = require('../../utils/response-handler');

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    await registerUser(email.toLowerCase(), password);
    responseHandler.handleSuccess(res, 201);
  } catch (error) {
    responseHandler.handleError(res, 500);
  }
});

router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const userEmail = await findByEmail(email);

    responseHandler.handleSuccess(res, 200, { emailFound: !!userEmail });
  } catch (error) {
    responseHandler.handleError(res, 500);
  }
});

module.exports = router;
