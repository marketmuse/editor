import cleanHtml from '@utils/cleanHtml';
import deserialize from '@editor/deserializer/deserialize';

// extract attributes from NamedNodeMap to plain object
const extractAttributes = el => {
  if (!el || !el.attributes) return {};
  const res = {};
  const args = el.attributes;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    res[arg.nodeName] = arg.nodeValue;
  }
  return res;
};

const deserializeHtml = (options = {}, el) => {

  const {

    // parse links as text content
    ignoreLinks = false,

  } = options;

  let current = el;
  let currentAttrs = extractAttributes(el);

  let { nodeType, nodeName, textContent } = current;

  // deserialize children
  let children = Array.from(current.childNodes)
    .map(child => deserializeHtml(options, child))
    .flat()

  const isText = nodeType === window.Node.TEXT_NODE;
  const isElement = nodeType === window.Node.ELEMENT_NODE;
  const isLink = nodeName === 'A';
  const hasInnerText = !!textContent;

  // only evaluate element nodes (ie. <p>, <div> etc.)
  if (!isElement && !isText) return children;

  // if a link has no anchor text, ignore
  if (isLink && !hasInnerText) return children;

  // if a link has no href or ignoring links, treat it as a text node
  if (isLink && (ignoreLinks || !currentAttrs.href)) {
    currentAttrs = {};
    children = textContent;
    nodeName = '#text';
  }

  // if text element, its content is its children
  if (isText) children = textContent;

  // deserialize element
  return deserialize(nodeName, currentAttrs, children);
}

export default (options = {}) => (...strs) => {

  // cover tag function usage (ie. invocation with template literals)
  const html = Array.isArray(strs[0]) ? String.raw(...strs) : strs[0];

  const clean = cleanHtml(html);

  // parse html for deserializing
  const parsed = new window.DOMParser().parseFromString(clean, 'text/html');

  return deserializeHtml(options, parsed);
};
