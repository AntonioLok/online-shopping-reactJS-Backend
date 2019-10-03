const { format } = require('winston');
const stack = require('callsite');
const _ = require('lodash');

const customFormatLoggerUtility = () => {
  const { printf } = format;
  return printf((info) => {
    const { level } = info;
    const site = _.get(stack(), [9]);
    return `${level}: ${site.getFunctionName() || 'anonymous'} ${site.getFileName()} ${site.getLineNumber()}`;
  });
};

const customFormatLoggerMiddleware = () => {
  const { printf } = format;

  return printf((info) => {
    const { level, message } = info;
    const { req } = message;
    const { url, method } = req;
    const currentTimestamp = (new Date()).toISOString();
    return `${currentTimestamp} ${level}: ${method} ${url}`;
  });
};

module.exports = { customFormatLoggerMiddleware, customFormatLoggerUtility };
