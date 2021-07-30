const debug = require('debug');

module.exports.stringify = (obj) => {
  return JSON.stringify(obj, null, 0);
};

module.exports.parse = (str) => {
  return JSON.parse(str);
};

module.exports.LoggerFactory = (source) => {
  return {
    info(message, ...args) {
      const logger = debug(source);
      logger(`INFO :: ${source} :: ${message}`, ...args);
    },

    warn(message, ...args) {
      const logger = debug(source);
      logger(`WARN :: ${source} :: ${message}`, ...args);
    },

    error(message, ...args) {
      const logger = debug(source);
      logger(`ERROR :: ${source} :: ${message}`, ...args);
    },
  };
};
