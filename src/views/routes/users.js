const router = require('express').Router();
const jwt = require('jsonwebtoken');
const getUser = require('../../controllers/user/get-user');
const registerUser = require('../../controllers/user/register');
const generateToken = require('../../controllers/user/generate-token');
const responseHandler = require('../../utils/response-handler');
const JWT_SECRET = require('../../utils/config');
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

const {
  error: {
    JWT_MALFORMED,
    JWT_INVALID_SIGNATURE,
    JWT_EXPIRED,
  },
} = constants.jwtResponse;

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

    responseHandler.handleSuccess(res, success.CODE, { emailFound: !!user });
  } catch (error) {
    responseHandler.handleError(res, serverError.CODE);
  }
});

router.get('/validate-token/:token', (req, res) => {
  try {
    const { token } = req.params;

    const decodedToken = jwt.verify(token, JWT_SECRET);
    responseHandler.handleSuccess(res, success.CODE, decodedToken);
  } catch (error) {
    const { message } = error;

    switch (message) {
      case JWT_MALFORMED.ERROR:
        responseHandler.handleError(res, unauthorized.CODE, JWT_MALFORMED.MSG);
        break;
      case JWT_EXPIRED.ERROR:
        responseHandler.handleError(res, unauthorized.CODE, JWT_EXPIRED.MSG);
        break;
      case JWT_INVALID_SIGNATURE.ERROR:
        responseHandler.handleError(res, unauthorized.CODE, JWT_INVALID_SIGNATURE.MSG);
        break;
      default:
        responseHandler.handleError(res, serverError.CODE);
    }
  }
});

module.exports = router;
