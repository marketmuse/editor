// To use with a custom jsx pragma comment:
// https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#custom

import { createHyperscript } from 'slate-hyperscript';
import removeBabelProps from '@utils/removeBabelProps';
import deserialize, { tags } from '@editor/deserializer/deserialize';

// create hyperscript creator
const hyperscript = createHyperscript({
  elements: Object.keys(tags).reduce((acc, t) =>
    ({ ...acc, [t.toLowerCase()]: {} }), {})
});

export default (tag, attrs = {}, ...children) => {
  removeBabelProps(attrs);

  // do not attempt to deserialize slate-hyperscript specific syntax
  if (tag === 'editor' || tag === 'anchor' || tag === 'focus' || tag === 'cursor') {
    return hyperscript(tag, attrs, ...children);
  }

  // deserialize tags
  const useAttrs = deserialize(tag, attrs, ...children);

  // to be handled by slate-hyperscript, delete
  delete useAttrs.children;
  delete useAttrs.text;

  // deserialize with slate-hyperscript
  return hyperscript(tag, { ...attrs, ...useAttrs }, ...children);
}
