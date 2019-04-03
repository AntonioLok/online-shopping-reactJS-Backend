const handleSuccess = (res, status, data = null) => {
  let statusCode = status;
  let statusText;

  switch (status) {
    case 200:
      statusText = 'SUCCESS';
      break;
    case 201:
      statusText = 'CREATED';
      break;
    default:
      statusCode = 200;
      statusText = 'SUCCESS';
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
    case 400:
      statusText = 'BAD_REQUEST';
      msg = message || 'The request was malformed or missing a required parameter.';
      break;
    case 401:
      statusText = 'UNAUTHORIZED';
      msg = message || 'The authorization credentials provided are insufficient.';
      break;
    case 403:
      statusText = 'FORBIDDEN';
      msg = message || 'You dont have permission to access [directory] on this server';
      break;
    case 404:
      statusText = 'NOT_FOUND';
      msg = message || 'The requested resource or endpoint was not found.';
      break;
    case 409:
      statusText = 'CONFLICT';
      msg = message || 'The entity to be created already exists.';
      break;

    case 500:
    default:
      statusCode = 500;
      statusText = 'SERVER_ERROR';
      msg = message || 'An unknown error occurred with the request.';
      break;
  }

  const payload = { statusCode, statusText, message: msg };
  res.status(statusCode).json(payload);
};

module.exports = {
  handleError,
  handleSuccess,
};
