const debug = require('debug');

module.exports.stringify = (obj) => {
  return JSON.stringify(obj, null, 0);
};

module.exports.parse = (str) => {
  return JSON.parse(str);
};

module.exports.LoggerFactory = (source) => (method) => {
  const logger = debug('app');

  return {
    info(message, ...args) {
      logger(`INFO :: ${source} :: ${method} :: ${message}`, ...args);
    },

    warn(message, ...args) {
      logger(`WARN :: ${source} :: ${method} :: ${message}`, ...args);
    },

    error(message, ...args) {
      logger(`ERROR :: ${source} :: ${method} :: ${message}`, ...args);
    },
  };
};
