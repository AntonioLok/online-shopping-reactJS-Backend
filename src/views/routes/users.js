const router = require('express').Router();
const getUser = require('../../controllers/user/getUser');
const registerUser = require('../../controllers/user/register');
const generateToken = require('../../controllers/user/generateToken');
const responseHandler = require('../../utils/response-handler');
const constants = require('../../constants');

const {
  AUTH__EMAIL_DOES_NOT_EXIST,
  AUTH__PASSWORD_DOES_NOT_MATCH,
  AUTH__EMAIL_ALREADY_IN_USE,
} = constants.errorCodes;

const {
  error: {
    unauthorized,
    conflict,
    serverError,
  },
  success: {
    success,
    created,
  },
} = constants.httpResponse;

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    await registerUser(email.toLowerCase(), password);
    responseHandler.handleSuccess(res, created.CODE);
  } catch (error) {
    const { message } = error;

    if (message.includes(AUTH__EMAIL_ALREADY_IN_USE)) {
      responseHandler.handleError(res, conflict.CODE);
    } else {
      responseHandler.handleError(res, serverError.CODE);
    }
  }
});

// eslint-disable-next-line consistent-return
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await generateToken(email, password);

    responseHandler.handleSuccess(res, success.CODE, token);
  } catch (error) {
    const { message } = error;

    if (message.includes(AUTH__EMAIL_DOES_NOT_EXIST)
      || message.includes(AUTH__PASSWORD_DOES_NOT_MATCH)) {
      responseHandler.handleError(res, unauthorized.CODE);
    } else {
      responseHandler.handleError(res, serverError.CODE);
    }
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
