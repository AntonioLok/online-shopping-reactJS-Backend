const { format } = require('winston');
const stack = require('callsite');
const _ = require('lodash');
const chalk = require('chalk');

const customFormatLoggerUtility = () => {
  const { printf } = format;
  return printf((info) => {
    const { level, message } = info;
    const color = { info: 'white', warn: 'yellow', error: 'red' };
    const site = _.get(stack(), [10]);
    const context = `${site.getFunctionName() || 'anonymous'} ${site.getFileName()} ${site.getLineNumber()}`;
    return `${level} ${chalk[color[level]](message)} ${chalk.gray(context)}`;
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
