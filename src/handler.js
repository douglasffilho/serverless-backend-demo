const { parse, stringify, LoggerFactory } = require('./utils');
const log = LoggerFactory('handler');

const sumOperation = (numbers) => {
  log.info('running a sum with %o', numbers[numbers.length - 1]);
  return numbers.reduce((accum, current) => (accum ?? 0) + current);
};

const subtractOperation = (numbers) => {
  log.info('running a subtraction with %o', numbers);
  return numbers.reduce((accum, current) => (accum ?? 0) - current);
};

const multiplyOperation = (numbers) => {
  log.info('running a multiplication with %o', numbers);
  return numbers.reduce((accum, current) => (accum ?? 1) * current);
};

const divideOperation = (numbers) => {
  log.info('running a division with %o', numbers);
  if (numbers[numbers.length - 1] === 0)
    throw new Error('invalid division by zero');
  return numbers.reduce((accum, current) => (accum ?? 1) / current);
};

const handle = async (event, operation) => {
  const { numbers } = parse(event?.body ?? '{}');
  if (!numbers) {
    log.warn('no numbers found on event %o', event);

    return {
      statusCode: 400,
      body: stringify({
        message:
          'give us an array of numbers like "{ "numbers": [1, 1, 2, 3, 5] }"',
        logref: 'invalid-input',
      }),
    };
  }

  try {
    const response = operation(numbers);

    return { body: stringify({ response }), statusCode: 200 };
  } catch (error) {
    log.error('error trying to do operation %o', error);

    return {
      statusCode: 500,
      body: stringify({
        message: error?.message ?? error,
        logref: 'internal-server-error',
      }),
    };
  }
};

module.exports = {
  async sum(event) {
    return handle(event, sumOperation);
  },

  async sub(event) {
    return handle(event, subtractOperation);
  },

  async multi(event) {
    return handle(event, multiplyOperation);
  },

  async div(event) {
    return handle(event, divideOperation);
  },
};
