import { Text } from 'slate'
import getMatchesText from '@editor/decorators/utils/getMatchesText';
import getMatchesTexts from '@editor/decorators/utils/getMatchesTexts';
import getMatchesRegex from '@editor/decorators/utils/getMatchesRegex';
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

    // if match not provided, exit
    if (typeof decorator.match !== 'function') return;

    const decoratorId = decorator.id;
    const decoratorKey = getDecoratorKey(decoratorId);

    // initiate aggregates
    matches[decoratorId] = {};
    aggregates[decoratorId] = 0;

    // transform text according to decorator configuraton
    const useText = typeof decorator.transform === 'function'
      ? decorator.transform(text)
      : text;

    // create regular expression factories with text in closure
    const matchesText = getMatchesText(useText);
    const matchesTexts = getMatchesTexts(useText);
    const matchesRegex = getMatchesRegex(useText);

    // generate regular expression
    const regex = decorator.match({
      matchesText,
      matchesTexts,
      matchesRegex
    });

    // match here
    let terms = [];
    while ((terms = regex.exec(useText)) !== null) {
      
      // matched term
      const term = (terms[0] || '');

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

  console.log('matches', matches);
  console.log('aggregates', aggregates);
  return ranges;
};
