const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./../config');
const responseHandler = require('../../utils/response-handler');
const constants = require('../../constants');
const logger = require('../../utils/logger');

const {
  error: {
    unauthorized,
    serverError,
  },
} = constants.httpResponse;

const {
  error: {
    JWT_MALFORMED,
    JWT_INVALID_SIGNATURE,
    JWT_EXPIRED,
    JWT_NOT_PROVIDED,
  },
} = constants.jwtResponse;


const getDecodedToken = (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, JWT_SECRET);

    req.decodedToken = decodedToken;
    next();
  } catch (error) {
    logger.error(error);

    const { message } = error;

    switch (message) {
      case JWT_NOT_PROVIDED.ERROR:
        responseHandler.handleError(res, unauthorized.CODE, JWT_NOT_PROVIDED.MSG);
        break;
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
};

module.exports = getDecodedToken;
