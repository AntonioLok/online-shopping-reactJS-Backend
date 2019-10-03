const { createLogger, transports } = require('winston');
const { customFormatLoggerUtility } = require('./logger-custom-format');

const logger = createLogger({
  level: 'error',
  transports: new transports.Console(),
  format: customFormatLoggerUtility(),
});

module.exports = logger;
