const { format } = require('winston');

const customFormat = () => {
  const { printf } = format;

  return printf((info) => {
    const {
      level, message, stack,
    } = info;

    if (info instanceof Error) {
      return `${level} - ${stack}`;
    }

    const { req } = message;
    const { url, method } = req;
    const currentTimestamp = (new Date()).toISOString();
    return `${currentTimestamp} ${level}: ${method} ${url}`;
  });
};

module.exports = customFormat;
