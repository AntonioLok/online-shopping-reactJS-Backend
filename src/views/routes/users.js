const router = require('express').Router();
const sendRecoveryEmail = require('../../controllers/user/send-recovery-email');
const getUser = require('../../controllers/user/get-user');
const changeUserPassword = require('../../controllers/user/change-user-password');
const registerUser = require('../../controllers/user/register');
const generateToken = require('../../controllers/user/generate-token');
const responseHandler = require('../../utils/response-handler');
const constants = require('../../constants');
const errLogger = require('../../utils/error-logger');

const {
  AUTH__USER_DOES_NOT_EXIST,
  AUTH__PASSWORD_DOES_NOT_MATCH,
  AUTH__EMAIL_ALREADY_IN_USE,
  AUTH__PASSWORD_RESET_LINK_INVALID_OR_EXPIRED,
} = constants.errorCodes;

const {
  error: {
    badRequest,
    conflict,
    notFound,
    serverError,
    unauthorized,
  },
  success: {
    success,
    created,
  },
} = constants.httpResponse;

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    await registerUser(username.toLowerCase(), password);
    responseHandler.handleSuccess(res, created.CODE);
  } catch (error) {
    const { message } = error;
    errLogger.error(error);

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
    const { username, password } = req.body;
    const token = await generateToken(username, password);

    responseHandler.handleSuccess(res, success.CODE, token);
  } catch (error) {
    const { message } = error;
    errLogger.error(error);

    if (message.includes(AUTH__USER_DOES_NOT_EXIST)
      || message.includes(AUTH__PASSWORD_DOES_NOT_MATCH)) {
      responseHandler.handleError(res, unauthorized.CODE);
    } else {
      responseHandler.handleError(res, serverError.CODE);
    }
  }
});

router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await getUser(username);

    responseHandler.handleSuccess(res, success.CODE, { username: user.username });
  } catch (error) {
    const { message } = error;
    errLogger.error(error);

    if (message.includes(AUTH__USER_DOES_NOT_EXIST)) {
      responseHandler.handleError(res, notFound.CODE);
    } else {
      responseHandler.handleError(res, serverError.CODE);
    }
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { username } = req.body;

    await sendRecoveryEmail(username);
    responseHandler.handleSuccess(res, success.CODE);
  } catch (error) {
    const { message } = error;
    errLogger.error(error);

    if (message.includes(AUTH__USER_DOES_NOT_EXIST)) {
      responseHandler.handleError(res, badRequest.CODE);
    } else {
      responseHandler.handleError(res, serverError.CODE);
    }
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { username, token, newPassword } = req.body;

    await changeUserPassword(username, newPassword, token);

    responseHandler.handleSuccess(res, success.CODE);
  } catch (error) {
    const { message } = error;
    errLogger.error(error);

    if (message.includes(AUTH__PASSWORD_RESET_LINK_INVALID_OR_EXPIRED)) {
      responseHandler.handleError(res, unauthorized.CODE);
    } else {
      responseHandler.handleError(res, serverError.CODE);
    }
  }
});

module.exports = router;
