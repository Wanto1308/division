export default jest.fn(() => ({
  format: jest.fn(v => v),
  diff: jest.fn(v => v),
  isBefore: jest.fn(v => v)
}));
