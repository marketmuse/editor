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

// convert tag settings into dictionary grouped by tags
const tagSettingsToDict = (tagSettings = []) => {
  if (!Array.isArray(tagSettings)) return {};
  return tagSettings.reduce((acc, tagSetting) => ({
    ...acc,
    [(tagSetting.tag || '').toLowerCase()]: tagSetting.parse
  }), {});
}

const deserializeHtml = (options = {}, el) => {

  const {

    // adjust render behaviour
    // key (string): tag names
    // value (object or function( el: HTMLElement, attrs: object ) -> object) - settings
    // object, or fn that receives el and attributes, and returns the settings
    // - text: bool - parse node and its children as text
    // - textChildren: bool - parse node normally, children as text
    // - continue: bool - skip node, parse children normally
    // - skip: bool - skip node its children
    tagSettings = {}

  } = options;

  let current = el;
  let currentAttrs = extractAttributes(el);

  let { nodeType, nodeName, textContent } = current;

  // extract parse setting
  let tagSetting = tagSettings[nodeName.toLowerCase()];

  // if parse settings is a function
  // execute it to get the settings
  if (typeof tagSetting === 'function') {
    tagSetting = tagSetting(current, currentAttrs);
  }

  // no parse settings / invalid parse settings returned from fn
  if (!tagSetting || typeof tagSetting !== 'object') {
    tagSetting = {};
  }

  const isText = nodeType === window.Node.TEXT_NODE;
  const isElement = nodeType === window.Node.ELEMENT_NODE;
  const isLink = nodeName === 'A';
  const hasTextContent = !!textContent;

  // only evaluate element nodes (ie. <p>, <div> etc.)
  if (!isElement && !isText) tagSetting.skipCurrent = true;
  // if an element has nothing in it to render, ignore
  if (!hasTextContent) tagSetting.skip = true;
  // if text node, its content is its children
  if (isText) tagSetting.text = true;
  // if a link has no href or ignoring links, treat it as a text node
  if (isLink && !currentAttrs.href) tagSetting.text = true;

  // parse --

  // skip node and all its children
  if (tagSetting.skip) return [];

  // deserialize children
  let children = Array.from(current.childNodes)
    .map(child => deserializeHtml(options, child))
    .flat()

  // skip current node and continue with children
  if (tagSetting.continue) return children;
  // parse node and all its children as text node
  if (tagSetting.text) return deserialize('#text', {}, textContent);
  // parse node normally and its children as text
  if (tagSetting.textChildren) return deserialize(nodeName, currentAttrs, textContent);
  // parse node and children normally
  return deserialize(nodeName, currentAttrs, children);
}

export default (options = {}) => (...strs) => {

  // cover tag function usage (ie. invocation with template literals)
  const html = Array.isArray(strs[0]) ? String.raw(...strs) : strs[0];

  const clean = cleanHtml(html);

  // parse html for deserializing
  const parsed = new window.DOMParser().parseFromString(clean, 'text/html');

  // convert tag settings to dictionary
  const tagSettings = tagSettingsToDict(options.tagSettings);

  return deserializeHtml({ ...options, tagSettings }, parsed.body);
};
