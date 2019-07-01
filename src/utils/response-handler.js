const constants = require('../constants');

const { success, error } = constants.httpResponse;

const handleSuccess = (res, status, data = null) => {
  let statusCode = status;
  let statusText;

  switch (status) {
    case success.success.CODE:
      statusText = success.success.STATUS_TEXT;
      break;
    case success.created.CODE:
      statusText = success.created.STATUS_TEXT;
      break;
    default:
      statusCode = success.success.CODE;
      statusText = success.success.STATUS_TEXT;
      break;
  }

  const payload = { statusCode, statusText, data };
  res.status(statusCode).json(payload);
};

const handleError = (res, status, message = null) => {
  let statusCode = status;
  let statusText;
  let msg = '';

  switch (statusCode) {
    case error.badRequest.CODE:
      statusText = error.badRequest.STATUS_TEXT;
      msg = message || error.badRequest.DEFAULT_MSG;
      break;

    case error.unauthorized.CODE:
      statusText = error.unauthorized.STATUS_TEXT;
      msg = message || error.unauthorized.DEFAULT_MSG;
      break;

    case error.forbidden.CODE:
      statusText = error.forbidden.STATUS_TEXT;
      msg = message || error.forbidden.DEFAULT_MSG;
      break;

    case error.notFound.CODE:
      statusText = error.notFound.STATUS_TEXT;
      msg = message || error.notFound.DEFAULT_MSG;
      break;

    case error.conflict.CODE:
      statusText = error.conflict.STATUS_TEXT;
      msg = message || error.conflict.DEFAULT_MSG;
      break;

    case error.serverError.CODE:
    default:
      statusCode = error.serverError.CODE;
      statusText = error.serverError.STATUS_TEXT;
      msg = message || error.serverError.DEFAULT_MSG;
      break;
  }

  const payload = { statusCode, statusText, message: msg };
  res.status(statusCode).json(payload);
};

module.exports = {
  handleError,
  handleSuccess,
};
