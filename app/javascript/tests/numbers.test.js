import { getNumberOrPlaceholder } from 'utils/numbers';

test('should return placeholder if value does not exist', () => {
  const value = undefined;
  expect(getNumberOrPlaceholder(value)).toEqual('...');
});

test('should return value if value exist', () => {
  const value = 123;
  expect(getNumberOrPlaceholder(value)).toEqual(123);
});
