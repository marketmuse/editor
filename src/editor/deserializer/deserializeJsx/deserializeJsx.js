// To use with a custom jsx pragma comment:
// https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#custom

import { createHyperscript } from 'slate-hyperscript';
import removeBabelProps from '@utils/removeBabelProps';
import deserialize, { isKnown, tags } from '@editor/deserializer/deserialize';

// create hyperscript creator
const hyperscript = createHyperscript({
  elements: Object.keys(tags).reduce((acc, t) =>
    ({ ...acc, [t.toLowerCase()]: {} }), {})
});

export default (tag, args = {}, ...children) => {
  removeBabelProps(args);

  // do not attempt to deserialize slate-hyperscript specific syntax
  if (tag === 'editor' || tag === 'anchor' || tag === 'focus' || tag === 'cursor') {
    return hyperscript(tag, args, ...children);
  }

  // deserialize tags
  const useArgs = isKnown(tag) ? deserialize(tag, args, children) : {};

  // to be handled by slate-hyperscript, delete
  delete useArgs.children;
  delete useArgs.text;

  // deserialize with slate-hyperscript
  return hyperscript(tag, { ...args, ...useArgs }, ...children);
}
