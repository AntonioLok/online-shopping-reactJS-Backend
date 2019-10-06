const { createLogger, transports } = require('winston');
const { customFormatLoggerUtility } = require('./logger-custom-format');

const logger = createLogger({
  transports: new transports.Console(),
  format: customFormatLoggerUtility(),
});

module.exports = logger;
