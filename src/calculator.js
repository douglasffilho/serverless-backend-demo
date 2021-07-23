const stringify = (obj) => {
  return JSON.stringify(obj, null, 0);
};

const parse = (str) => {
  return JSON.parse(str);
};

const sumOperation = (numbers) => {
  return numbers.reduce((accum, current) => (accum ?? 0) + current);
};

const subtractOperation = (numbers) => {
  return numbers.reduce((accum, current) => (accum ?? 0) - current);
};

const multiplyOperation = (numbers) => {
  return numbers.reduce((accum, current) => (accum ?? 0) * current);
};

const divideOperation = (numbers) => {
  return numbers.reduce((accum, current) => (accum ?? 0) / current);
};

const handle = async (event, operation) => {
  const { numbers } = parse(event?.body ?? '{}');
  if (!numbers)
    return {
      statusCode: 400,
      body: stringify({
        message:
          'give us an array of numbers like "{ "numbers": [1, 1, 2, 3, 5] }"',
        logref: 'invalid-input',
      }),
    };

  const response = operation(numbers);

  return { body: stringify({ response }), statusCode: 200 };
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
