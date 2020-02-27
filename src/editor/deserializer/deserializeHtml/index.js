import cleanHtml from '@utils/cleanHtml';
import deserialize from '@editor/deserializer/deserialize';

const deserializeHtml = el => {

  // in some cases we'll need to ignore the parent and continue deserializing
  // children. when that's the case, set current to el.childNodes[0]
  let current = el;

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

  return deserialize(nodeName, {}, children);
}

export default (...strs) => {

  // cover tag function usage (ie. invocation with template literals)
  const html = Array.isArray(strs[0]) ? String.raw(...strs) : strs[0];

  const clean = cleanHtml(html);

  // parse html for deserializing
  const parsed = new window.DOMParser().parseFromString(clean, 'text/html');

  return deserializeHtml(parsed);
};
