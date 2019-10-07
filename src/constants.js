const constants = {
  httpResponse: {
    success: {
      success: {
        CODE: 200,
        STATUS_TEXT: 'SUCCESS',
      },
      created: {
        CODE: 201,
        STATUS_TEXT: 'CREATED',
      },
      noContent: {
        CODE: 204,
        STATUS_TEXT: 'NO_CONTENT',
      },
    },
    error: {
      badRequest: {
        CODE: 400,
        STATUS_TEXT: 'BAD_REQUEST',
        DEFAULT_MSG: 'The request was malformed or missing a required parameter.',
      },
      unauthorized: {
        CODE: 401,
        STATUS_TEXT: 'UNAUTHORIZED',
        DEFAULT_MSG: 'The authorization credentials provided are insufficient.',
      },
      forbidden: {
        CODE: 403,
        STATUS_TEXT: 'FORBIDDEN',
        DEFAULT_MSG: 'The request was malformed or missing a required parameter.',
      },
      notFound: {
        CODE: 404,
        STATUS_TEXT: 'NOT_FOUND',
        DEFAULT_MSG: 'The requested resource or endpoint was not found.',
      },
      conflict: {
        CODE: 409,
        STATUS_TEXT: 'CONFLICT',
        DEFAULT_MSG: 'The entity to be created already exists.',
      },
      serverError: {
        CODE: 500,
        STATUS_TEXT: 'SERVER_ERROR',
        DEFAULT_MSG: 'An unknown error occurred with the request.',
      },
    },
  },
  mongoResponse: {
    error: {
      duplicationKey: {
        CODE: 11000,
      },
    },
  },
  jwtResponse: {
    error: {
      // same error messages thrown by jwt.verify when token is invalid
      JWT_MALFORMED: { ERROR: 'jwt malformed', MSG: 'The token received is malformed' },
      JWT_INVALID_SIGNATURE: { ERROR: 'invalid signature', MSG: 'The token received has an invalid signature' },
      JWT_EXPIRED: { ERROR: 'jwt expired', MSG: 'The token received has expired' },
      JWT_NOT_PROVIDED: { ERROR: 'jwt must be provided', MSG: 'Token was not provided' },
    },
  },
  errorCodes: {
    AUTH__EMAIL_DOES_NOT_EXIST: 'AUTH__EMAIL_DOES_NOT_EXIST',
    AUTH__PASSWORD_DOES_NOT_MATCH: 'AUTH__PASSWORD_DOES_NOT_MATCH',
    AUTH__EMAIL_ALREADY_IN_USE: 'AUTH__EMAIL_ALREADY_IN_USE',
  },
};

module.exports = constants;
