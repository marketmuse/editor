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

const deserializeHtml = el => {

  const current = el;
  const currentAttrs = extractAttributes(el);

  const { nodeType, nodeName, childNodes } = current;

  // deserialize children
  let children = Array.from(childNodes)
    .map(deserializeHtml)
    .flat()

  const isText = nodeType === window.Node.TEXT_NODE;
  const isElement = nodeType === window.Node.ELEMENT_NODE;

  // only evaluate element nodes (ie. <p>, <div> etc.)
  if (!isElement && !isText) return children;

  // if text element, its content is its children
  if (isText) children = current.textContent;

  return deserialize(nodeName, currentAttrs, children);
}

export default (...strs) => {

  // cover tag function usage (ie. invocation with template literals)
  const html = Array.isArray(strs[0]) ? String.raw(...strs) : strs[0];

  const clean = cleanHtml(html);

  // parse html for deserializing
  const parsed = new window.DOMParser().parseFromString(clean, 'text/html');

  return deserializeHtml(parsed);
};
