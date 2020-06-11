import normalizeString from '@editor/decorators/utils/normalizeString';
import isStringValid from '@editor/decorators/utils/isStringValid';

export default (str = '', { wholeWord = false } = {}) => {
  let useString = normalizeString(String(str));
  if (!isStringValid(useString)) return null;
  if (wholeWord) useString = `\\b${useString}\\b`;
  return new RegExp(useString, 'gi');
};
