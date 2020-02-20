import { Text } from 'slate'
import regexFromRegex from '@editor/decorators/utils/regexFromRegex';
import regexFromArray from '@editor/decorators/utils/regexFromArray';
import regexFromString from '@editor/decorators/utils/regexFromString';
import getDecoratorKey from '@editor/decorators/utils/getDecoratorKey';

export default (decorators = []) => ([ node, path ]) => {

  // only decorate text nodes
  if (!Text.isText(node)) return [];

  const ranges = [];
  const matches = {};
  const aggregates = {};
  const { text } = node;

  // walk through decorators
  decorators.forEach(decorator => {

    const decoratorId = decorator.id;
    const decoratorKey = getDecoratorKey(decoratorId);

    // initiate aggregates
    matches[decoratorId] = {};
    aggregates[decoratorId] = 0;

    // transform text according to decorator configuraton
    const useText = typeof decorator.transform === 'function'
      ? decorator.transform(text)
      : text;

    // get regex
    let regex = decorator.match;
    if (regex instanceof RegExp) regex = regexFromRegex(regex);
    if (typeof regex === 'string') regex = regexFromString(regex);
    if (Array.isArray(regex)) regex = regexFromArray(regex);

    // if a non-convertible value provided, throw an error
    if (regex instanceof RegExp !== true) {
      throw new Error(`Invalid 'match' in decorator "${decorator.id}"`)
    }

    // match here
    let terms = [];
    while ((terms = regex.exec(useText)) !== null) {

      // matched term
      const term = (terms[0] || '');

      // do not proceed if custom evaluation fails
      const { evaluate } = decorator;
      const valid = typeof evaluate !== 'function' ? true : evaluate({
        term,
        terms: matches[decoratorId],
        aggregate: aggregates[decoratorId]
      })

      // do not add decorators or keep
      // counts if match not desired
      if (!valid) return;

      // keep stats of matches
      if (!matches[decoratorId][term]) { matches[decoratorId][term] = 0; }
      matches[decoratorId][term] += 1;
      aggregates[decoratorId] += 1;

      // add decorators here
      ranges.push({
        anchor: { path, offset: terms.index },
        focus: { path, offset: terms.index + term.length },
        [decoratorKey]: true,
      })
    }

  })

  console.log('>', matches, aggregates)
  return ranges;
};
