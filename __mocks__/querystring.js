export default {
  ...jest.requireActual('querystring'),
  stringify: jest.fn(() => 'query'),
  parse: jest.fn(() => ({ query: 'test' })),
};
