import { createHyperscript } from 'slate-hyperscript'

const h = createHyperscript({
  elements: {
    block: {},
    inline: { inline: true },
  },
});

// strip attributes added by babel
export default (tagName, attributes, ...children) => {
  delete attributes.__self;
  delete attributes.__source;
  return h(tagName, attributes, ...children);
}
