import normalizeString from '@editor/decorators/utils/normalizeString';
import isStringValid from '@editor/decorators/utils/isStringValid';

export default (str = '') => {
  const useString = normalizeString(String(str));
  if (!isStringValid(useString)) return null;
  return new RegExp(useString, 'gi')
};
