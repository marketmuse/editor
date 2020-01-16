// Intended for testing purposes only
// Use with a custom jsx pragma comment:
// https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#custom

import { createHyperscript } from 'slate-hyperscript'
import { type as paragraphType } from '../components/editor/core/block/Paragraph';

const h = createHyperscript({
  elements: {
    block: {},
    paragraph: { type: paragraphType },
    inline: { inline: true },
  },
});

// strip attributes added by babel
export default (tagName, attributes, ...children) => {
  if (attributes && attributes.__self) delete attributes.__self;
  if (attributes && attributes.__source) delete attributes.__source;
  return h(tagName, attributes, ...children);
}
