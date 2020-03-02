import { attrs } from '@config/common';
import removeBabelProps from '@utils/removeBabelProps';

// deserializer instructions --

// pass these args to all children
export const CHILDREN_ARGS = 'children-args';
// pass these args to all leafs (ie. text nodes)
export const CHILDREN_LEAF_ARGS = 'children-leaf-args';
// pass these args to all non-leaf nodes (ie. element nodes)
export const CHILDREN_NODE_ARGS = 'children-node-args';
// this tag is for styling (ie. <b>...</b>). do not
// wrap, ignore and move on to the children
export const STYLE_TAG = 'style-tag';

const leaf = (args = {}, custom = {}) => ({
  ...args,
  ...custom,
  _instructions: {
    [STYLE_TAG]: true,
    [CHILDREN_LEAF_ARGS]: custom
  }
})

// leafs
const bold = (args = {}) => leaf(args, attrs.b());
const italic = (args = {}) => leaf(args, attrs.i());
const underline = (args = {}) => leaf(args, attrs.u());
const strikethrough = (args = {}) => leaf(args, attrs.s());

// elements
const paragraph = (_, children) => ({ children, ...attrs.p() })
const headingOne = (_, children) => ({ children, ...attrs.h1() })
const headingTwo = (_, children) => ({ children, ...attrs.h2() })
const headingThree = (_, children) => ({ children, ...attrs.h3() });
const link = ({ href } = {}, children) => ({ children, ...attrs.a({ href }) });
const listBulleted = (_, children) => ({ children, ...attrs.ul() });
const listNumbered = (_, children) => ({ children, ...attrs.ol() });
const listItem = (_, children) => ({ children, ...attrs.li() });
const blockQuote = (_, children) => ({ children, ...attrs.q() });

// misc
const fragment = (args = {}, children) =>
  ({ ...args, children: Array.isArray(children) ? children : [children] });
const text = (args = {}, text) =>
  ({ ...args, text: String(text).trim() });

// map allowed tags to functions
export const tags = {
  '#TEXT': text,
  'FRAGMENT': fragment,
  'BLOCK': fragment,
  'BR': paragraph, // <- treat br tags as empty paragraphs
  'P': paragraph,
  'BLOCKQUOTE': blockQuote,
  'Q': blockQuote,
  'H1': headingOne,
  'H2': headingTwo,
  'H3': headingThree,
  'H4': headingThree,
  'H5': headingThree,
  'H6': headingThree,
  'A': link,
  'UL': listBulleted,
  'OL': listNumbered,
  'LI': listItem,
  'B': bold,
  'STRONG': bold,
  'I': italic,
  'EM': italic,
  'U': underline,
  'S': strikethrough,
  'DEL': strikethrough,
  'STRIKE': strikethrough,
};

export const isKnown = tag => {
  const useTag = tag.toUpperCase();
  return typeof tags[useTag] === 'function';
}

export default (
  tag = '',
  attrs = {},
  children,
  options = {},
) => {

  // strip attrs added by babel
  removeBabelProps(attrs);

  if (!isKnown(tag)) return children;

  const useTag = tag.toUpperCase();
  const fn = tags[useTag];

  if (!fn) return children;

  // deserialize node
  const res = fn(attrs, children);

  // if children is string, it's a text node
  if (typeof res.children === 'string') {
    res.children = [text({}, res.children)]
  }

  // strings in children array are also text nodes
  if (Array.isArray(res.children)) {
    res.children = res.children.map(c => {
      if (c && typeof c === 'string') return text({}, c);
      return c;
    })
  }

  // this function deserializes a single node. however in
  // some cases, additional data / attributes needs to be
  // passed on to the children based on the node. for
  // those cases, pass `pre: true` to. if pre-deserializing
  // instructions to the parser will be passed on how to parse
  // current nodes children
  const { pre } = options;

  // only pass `pre` data
  if (!pre) delete res._instructions;

  return res;
};
