// To use with a custom jsx pragma comment:
// https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#custom

import { createHyperscript } from 'slate-hyperscript';
import removeBabelProps from '@utils/removeBabelProps';
import deserialize, { tags } from '@editor/deserializer/deserialize';

// create hyperscript creator
const h = createHyperscript({
  elements: Object
    .keys(tags)
    .map(t => t.toLowerCase())
    .reduce((acc, k) => ({ ...acc, [k]: {} }), {})
});

export default (tag, attrs = {}, ...children) => {
  removeBabelProps(attrs);

  const useAttrs = deserialize(tag, attrs, ...children);

  return h(tag, useAttrs, ...children);
}
