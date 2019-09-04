const _ = require('lodash');

const getTokenFromheader = (req, res, next) => {
  const { headers: { authorization } } = req;

  const token = _.isString(authorization) ? authorization.substring(authorization.indexOf(' ') + 1) : '';
  req.token = token;
  next();
};

module.exports = getTokenFromheader;
