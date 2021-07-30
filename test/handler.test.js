const handler = require('../src/handler');
const { stringify, parse } = require('../src/utils');

it('calculator sum', async () => {
  const event = { body: stringify({ numbers: [41, 1] }) };
  const result = await handler.sum(event);
  const status = result.statusCode;
  const { response } = parse(result.body);
  expect(status).toEqual(200);
  expect(response).toEqual(42);
});

it('calculator sub', async () => {
  const event = { body: stringify({ numbers: [43, 1] }) };
  const result = await handler.sub(event);
  const status = result.statusCode;
  const { response } = parse(result.body);
  expect(status).toEqual(200);
  expect(response).toEqual(42);
});

it('calculator multi', async () => {
  const event = { body: stringify({ numbers: [21, 2] }) };
  const result = await handler.multi(event);
  const status = result.statusCode;
  const { response } = parse(result.body);
  expect(status).toEqual(200);
  expect(response).toEqual(42);
});

it('calculator div', async () => {
  const event = { body: stringify({ numbers: [84, 2] }) };
  const result = await handler.div(event);
  const status = result.statusCode;
  const { response } = parse(result.body);
  expect(status).toEqual(200);
  expect(response).toEqual(42);
});

it('error if no numbers are present', async () => {
  const event = { body: stringify({ number: [21, 2] }) };
  const result = await handler.multi(event);
  const status = result.statusCode;
  const { message, logref } = parse(result.body);
  expect(400).toEqual(status);
  expect(message).toEqual(
    'give us an array of numbers like "{ "numbers": [1, 1, 2, 3, 5] }"',
  );
  expect(logref).toEqual('invalid-input');
});

it('error if operation fails', async () => {
  const event = { body: stringify({ numbers: [1, 0] }) };
  const result = await handler.div(event);
  const status = result.statusCode;
  const { message, logref } = parse(result.body);
  expect(status).toEqual(500);
  expect(message).toEqual('invalid division by zero');
  expect(logref).toEqual('internal-server-error');
});
