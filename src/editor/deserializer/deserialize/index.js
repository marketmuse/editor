import { attrs } from '@config/common';
import removeBabelProps from '@utils/removeBabelProps';

// leafs
const bold = (args = {}) => ({ ...args, ...attrs.b() });
const italic = (args = {}) => ({ ...args, ...attrs.i() });
const underline = (args = {}) => ({ ...args, ...attrs.u() });
const strikethrough = (args = {}) => ({ ...args, ...attrs.s() });

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
const fragment = (attrs = {}, children) =>
  ({ ...attrs, children: Array.isArray(children) ? children : [children] });
const text = (attrs = {}, text) =>
  ({ ...attrs, text: String(text).trim() });

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

export default (tag = '', attrs = {}, children) => {

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

  return res;
};
