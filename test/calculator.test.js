const calculator = require('../src/calculator');

const stringify = (obj) => {
  return JSON.stringify(obj, null, 0);
};

const parse = (str) => {
  return JSON.parse(str);
};

it('calculator sum', async () => {
  const event = { body: stringify({ numbers: [41, 1] }) };
  const result = await calculator.sum(event);
  const status = result.statusCode;
  const { response } = parse(result.body);
  expect(200).toEqual(status);
  expect(42).toEqual(response);
});

it('calculator sub', async () => {
  const event = { body: stringify({ numbers: [43, 1] }) };
  const result = await calculator.sub(event);
  const status = result.statusCode;
  const { response } = parse(result.body);
  expect(200).toEqual(status);
  expect(42).toEqual(response);
});

it('calculator multi', async () => {
  const event = { body: stringify({ numbers: [21, 2] }) };
  const result = await calculator.multi(event);
  const status = result.statusCode;
  const { response } = parse(result.body);
  expect(200).toEqual(status);
  expect(42).toEqual(response);
});

it('calculator div', async () => {
  const event = { body: stringify({ numbers: [84, 2] }) };
  const result = await calculator.div(event);
  const status = result.statusCode;
  const { response } = parse(result.body);
  expect(200).toEqual(status);
  expect(42).toEqual(response);
});
