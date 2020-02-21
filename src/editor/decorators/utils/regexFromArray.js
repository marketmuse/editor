import normalizeString from '@editor/decorators/utils/normalizeString';
import isStringValid from '@editor/decorators/utils/isStringValid';

export default (arr = []) => {

  // convert string array into valid
  // string to be used for regex
  const str = arr
    .map(String)
    .map(normalizeString)
    .filter(isStringValid)
    .join('|');

  // if final string not valid, return null
  if (!isStringValid(str)) return null;

  // return regex
  return new RegExp(str, 'gi');
}
