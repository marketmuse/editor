import deserialize from '@editor/deserializer/deserializeJsx';

const deserializeHtml = el => {

  // return text content if text node
  if (el.nodeType === window.Node.TEXT_NODE) return el.textContent;

  // only evaluate element nodes (ie. <p>, <div> etc.)
  if (el.nodeType !== window.Node.ELEMENT_NODE) return null;

  // in some cases we'll need to ignore the parent and continue deserializing
  // children. when that's the case, set current to el.childNodes[0]
  let current = el;

  // recurse
  const children = Array.from(current.childNodes)
    .map(deserializeHtml)
    .flat()

  return deserialize(current.nodeName, {}, children)
}

export default html => {
  const parsed = new window.DOMParser().parseFromString(html, 'text/html');
  return deserializeHtml(parsed);
};
