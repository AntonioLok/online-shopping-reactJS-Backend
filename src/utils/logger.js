const { createLogger, transports } = require('winston');
const { customFormatLoggerUtility } = require('./logger-custom-format');

const logger = level => createLogger({
  level,
  transports: new transports.Console(),
  format: customFormatLoggerUtility(),
});

exports.info = msg => logger('info').info(msg);
exports.error = msg => logger('error').error(msg);
exports.warn = msg => logger('warn').warn(msg);
