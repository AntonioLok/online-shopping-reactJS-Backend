const { createLogger, format, transports } = require('winston');

const errLogger = createLogger({
  level: 'error',
  transports: new transports.Console(),
  format: format.simple(),
});

module.exports = errLogger;
