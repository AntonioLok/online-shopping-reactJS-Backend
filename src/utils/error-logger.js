const { createLogger, transports } = require('winston');
const customFormat = require('./logger-custom-format');

const errLogger = createLogger({
  level: 'error',
  transports: new transports.Console(),
  format: customFormat(),
});

module.exports = errLogger;
