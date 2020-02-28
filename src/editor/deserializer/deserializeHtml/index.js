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

    // adjust render behaviour
    // key (string): tag names
    // value (object: parse setting): settings for this tag
    //  text: bool - parse node and its children as text
    //  textChildren: bool - parse node normally, children as text
    //  continue: bool - skip node, parse children normally
    //  skip: bool - skip node its children
    parseSettings = {}

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
  const hasTextContent = !!textContent;

  const parseSetting = (
    parseSettings[nodeName] ||
    parseSettings[nodeName.toLowerCase()]
  ) || {};

  // only evaluate element nodes (ie. <p>, <div> etc.)
  if (!isElement && !isText) parseSetting.skipCurrent = true;
  // if an element has nothing in it to render, ignore
  if (!hasTextContent) parseSetting.skip = true;
  // if a link has no href or ignoring links, treat it as a text node
  if (isLink && (!currentAttrs.href)) parseSetting.text = true;
  // if text node, its content is its children
  if (isText) parseSetting.text = true;

  // skip node and all its children
  if (parseSetting.skip) return children;
  // skip current node and continue with children
  else if (parseSetting.continue) return children;
  // parse node and all its children as text node
  else if (parseSetting.text) return deserialize('#text', {}, textContent);
  // parse node normally and its children as text
  else if (parseSetting.textChildren) return deserialize(nodeName, currentAttrs, textContent);
  // parse node and children normally
  else return deserialize(nodeName, currentAttrs, children);
}

export default (options = {}) => (...strs) => {

  // cover tag function usage (ie. invocation with template literals)
  const html = Array.isArray(strs[0]) ? String.raw(...strs) : strs[0];

  const clean = cleanHtml(html);

  // parse html for deserializing
  const parsed = new window.DOMParser().parseFromString(clean, 'text/html');

  return deserializeHtml(options, parsed);
};
