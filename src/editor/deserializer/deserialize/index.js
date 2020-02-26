import removeBabelProps from '@utils/removeBabelProps';

// base
const leaf = (attrs = {}) => ({ ...attrs });
const element = (type, attrs = {}) => ({ type, ...attrs });

// leafs
const bold = (attrs = {}) => leaf({ ...attrs, bold: true });
const italic = (attrs = {}) => leaf({ ...attrs, italic: true });
const underline = (attrs = {}) => leaf({ ...attrs, underline: true });
const strikethrough = (attrs = {}) => leaf({ ...attrs, strikethrough: true });

// elements
const paragraph = (_, children) => element('paragraph', { children });
const headingOne = (_, children) => element('heading-one', { children });
const headingTwo = (_, children) => element('heading-two', { children });
const headingThree = (_, children) => element('heading-three', { children });
const link = ({ href } = {}, children) => element('link', { href, children });
const listBulleted = (_, children) => element('bulleted-list', { children });
const listNumbered = (_, children) => element('numbered-list', { children });
const listItem = (_, children) => element('list-item', { children });
const blockQuote = (_, children) => element('blockquote', { children });

// misc
const fragment = (attrs = {}, children) =>
  ({ ...attrs, children: Array.isArray(children) ? children : [children] });
const text = (attrs = {}, text) =>
  ({ ...attrs, text: String(text) });

// map allowed tags to functions
export const tags = {
  BODY: fragment,
  FRAGMENT: fragment,
  BLOCK: fragment, // <- treat br tags as empty paragraphs
  BR: paragraph,
  P: paragraph,
  BLOCKQUOTE: blockQuote,
  Q: blockQuote,
  H1: headingOne,
  H2: headingTwo,
  H3: headingThree,
  H4: headingThree,
  H5: headingThree,
  H6: headingThree,
  A: link,
  UL: listBulleted,
  OL: listNumbered,
  LI: listItem,
  B: bold,
  STRONG: bold,
  I: italic,
  EM: italic,
  U: underline,
  S: strikethrough,
  DEL: strikethrough,
  STRIKE: strikethrough,
};

export default (tag = '', attrs = {}, ...children) => {

  // strip attrs added by babel
  removeBabelProps(attrs);

  const useTag = tag.toUpperCase();
  const fn = tags[useTag];

  if (!fn) return {};

  // deserialize node
  const res = fn(attrs, ...children);

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
