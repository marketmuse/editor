import deserialize from '@editor/deserializer/deserializeJsx';

const deserializeHtml = el => {

  console.log('-->', el);

  // return text content if text node
  if (el.nodeType === window.Node.TEXT_NODE) return el.textContent;
  // only evaluate element nodes (ie. <p>, <div> etc.)
  if (el.nodeType !== window.Node.ELEMENT_NODE) return null;
  // new line for <br />'s
  if (el.nodeName === 'BR') return '\n';

  let parent = el;

  const children = Array.from(parent.childNodes)
    .map(deserializeHtml)
    .flat()

  if (el.nodeName === 'BODY') {
    return deserialize('fragment', {}, children)
  }
}

export default deserializeHtml;
