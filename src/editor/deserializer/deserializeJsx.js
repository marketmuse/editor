// Use with a custom jsx pragma comment:
// https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#custom

import get from 'lodash/get';
import isNil from 'lodash/isNil';
import { createHyperscript } from 'slate-hyperscript'
import blocks from '../../components/editor/core/block';
import inlines from '../../components/editor/core/inline';

const elements = {
  ...blocks,
  ...inlines,
};

const h = createHyperscript({
  elements: {
    block: {},
    ...Object.keys(elements).reduce((acc, k) => ({
      ...acc, [k]: {}
    }), {})
  },
});

export default (tagName, attributes = {}, ...children) => {

  // strip attributes added by babel
  if (attributes && attributes.hasOwnProperty('__self')) delete attributes.__self;
  if (attributes && attributes.hasOwnProperty('__source')) delete attributes.__source;

  // check if there's an existing MMS editor component for given tagName,
  // if there is, we need to capitalize the tag name to use its configuration,
  // because that's how they're stored.
  const tagNameCapital = typeof tagName === 'string' ? tagName.toUpperCase() : null;
  const getAttributes = get(elements, tagNameCapital);

  // if editor element doesn't exist, return
  if (!getAttributes) return h(tagName, attributes, ...children);

  // if editor element exists, grab its config
  // and use those as the attributes
  const useAttributes = getAttributes(attributes);
  return h(tagNameCapital, useAttributes, ...children);
}
