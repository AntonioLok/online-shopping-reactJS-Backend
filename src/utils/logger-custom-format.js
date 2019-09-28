const { format } = require('winston');
const stack = require('callsite');
const _ = require('lodash');

const customFormat = () => {
  const { printf } = format;

  return printf((info) => {
    const { level, message } = info;

    if (info instanceof Error) {
      const site = _.get(stack(), [9]);
      return `${level}: ${site.getFunctionName() || 'anonymous'} ${site.getFileName()} ${site.getLineNumber()}`;
    }

    const { req } = message;
    const { url, method } = req;
    const currentTimestamp = (new Date()).toISOString();
    return `${currentTimestamp} ${level}: ${method} ${url}`;
  });
};

module.exports = customFormat;
