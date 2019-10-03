const { createLogger, transports } = require('winston');
const { customFormatLoggerMiddleware } = require('../logger-custom-format');

const logger = createLogger({
  transports: [
    new transports.Console({
      stringify: true,
      format: customFormatLoggerMiddleware(),
      level: 'info',
    }),
  ],
});

const logRequest = (req, res, next) => {
  logger.info({ req });
  next();
};

module.exports = logRequest;
