const router = require('express').Router();
const getUser = require('../../controllers/user/getUser');
const registerUser = require('../../controllers/user/register');
const generateToken = require('../../controllers/user/generateToken');
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

// eslint-disable-next-line consistent-return
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, userExists } = await generateToken(email, password);

    if (!userExists) {
      return responseHandler.handleError(res, 404, 'The user is not registered');
    }
    if (!token) {
      return responseHandler.handleError(res, 401, 'Password incorrect');
    }
    responseHandler.handleSuccess(res, 200, token);
  } catch (error) {
    responseHandler.handleError(res, 500);
  }
});


router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUser(email);

    responseHandler.handleSuccess(res, 200, { emailFound: !!user });
  } catch (error) {
    responseHandler.handleError(res, 500);
  }
});

module.exports = router;
