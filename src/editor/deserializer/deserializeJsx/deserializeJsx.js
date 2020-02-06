// To use with a custom jsx pragma comment:
// https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#custom

import get from 'lodash/get';
import isNil from 'lodash/isNil';
import { createHyperscript } from 'slate-hyperscript'
import { elementsByTag } from '@components/editor/core/elements';

// create hyperscript creator
const h = createHyperscript({
  elements: Object
    .keys(elementsByTag)
    .reduce((acc, k) => ({ ...acc, [k]: {} }), {})
});

export default (tagName, attributes = {}, ...children) => {

  // strip attributes added by babel
  if (attributes && attributes.hasOwnProperty('__self')) delete attributes.__self;
  if (attributes && attributes.hasOwnProperty('__source')) delete attributes.__source;

  // check if there's an existing MMS editor component for given tagName,
  // if there is, we need to capitalize the tag name to use its configuration,
  // because that's how they're stored.
  const getAttributes = get(elementsByTag, `['${tagName}'].get`);

  // if editor element doesn't exist, return
  if (!getAttributes) return h(tagName, attributes, ...children);

  // if editor element exists, grab its config
  // and use those as the attributes
  return h(tagName, getAttributes(attributes), ...children);
}
