const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./../config');
const responseHandler = require('../../utils/response-handler');
const constants = require('../../constants');

const {
  error: {
    forbidden,
  },
} = constants.httpResponse;


const getDecodedToken = (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, JWT_SECRET);

    req.decodedToken = decodedToken;
    next();
  } catch (error) {
    responseHandler.handleError(res, forbidden.CODE);
  }
};

module.exports = getDecodedToken;