import { both, is, complement, equals } from 'ramda';

const isValidNumber = both(is(Number), complement(equals(NaN)));

/**
 * Returns placeholder if value does not exist, otherwise returns value
 * @param {number} value
 * @param {string} placeholder
 * @returns {number|string}
 */
export const getNumberOrPlaceholder = (value, placeholder = '...') => {
  if (isValidNumber(value)) {
    return value;
  }
  return placeholder;
};
