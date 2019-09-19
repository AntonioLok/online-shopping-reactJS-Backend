const { createLogger, format, transports } = require('winston');

function customFormat() {
  const { printf } = format;

  return printf((info) => {
    const { message, level } = info;
    const { req } = message;
    const { url, method } = req;
    const currentTimestamp = (new Date()).toISOString();
    return `${currentTimestamp} ${level}: ${method} ${url}`;
  });
}


const logger = createLogger({
  transports: [
    new transports.Console({
      stringify: true,
      format: customFormat(),
      level: 'info',
    }),
  ],
});

const logRequest = (req, res, next) => {
  logger.info({ req });
  next();
};

module.exports = logRequest;
