import cleanHtml from '@utils/cleanHtml';
import deserialize from '@editor/deserializer/deserialize';

export const TEXT = 'text';
export const TEXT_CHILDREN = 'textChildren';
export const CONTINUE = 'continue';
export const CONTINUE_TEXT = 'continueText';
export const SKIP = 'skip';

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
  return tagSettings.reduce((acc, tagSetting) => {
    const t = (tagSetting.tag || '').toLowerCase();
    return { ...acc, [t]: tagSetting.parse };
  }, {});
}

const deserializeHtml = (options = {}, el) => {

  const {

    // adjust render behaviour
    // key (string): tag names
    // value (string or function( el: HTMLElement, attrs: object ) -> string) - parse
    // configuration, or fn that receives el and attributes, and returns configuration
    // possible values: normal (default), text, textChildren, continue, continueText and skip
    tagSettingsDict = {}

  } = options;

  let current = el;
  let currentAttrs = extractAttributes(el);

  let { nodeType, nodeName, textContent } = current;

  // extract parse setting
  let tagSetting = tagSettingsDict[nodeName.toLowerCase()];

  // if parse settings is a function
  // execute it to get the settings
  if (typeof tagSetting === 'function') {
    tagSetting = tagSetting(current, currentAttrs);
  }

  // get parse configuration for this tag
  let parseSkip = tagSetting === SKIP;
  let parseContinue = tagSetting === CONTINUE;
  let parseContinueText = tagSetting === CONTINUE_TEXT;
  let parseText = tagSetting === TEXT;
  let parseTextChildren = tagSetting === TEXT_CHILDREN;

  // get data on current node
  const isText = nodeType === window.Node.TEXT_NODE;
  const isElement = nodeType === window.Node.ELEMENT_NODE;
  const isLink = nodeName === 'A';
  const hasTextContent = !!textContent;

  // forced settings

  // only evaluate element nodes (ie. <p>, <div> etc.)
  if (!isElement && !isText) parseContinue = true;
  // if an element has nothing in it to render, ignore
  if (!hasTextContent) parseSkip = true;
  // if text node, its content is its children
  if (isText) parseText = true;
  // if a link has no href, treat it as a text node
  if (isLink && !currentAttrs.href) parseText = true;

  // parse --

  // skip node and all its children
  if (parseSkip) {
    return [];
  }

  // skip current node and continue with children as text
  if (parseContinueText) {
    return deserialize('#text', {}, Array.from(current.children)
      .reduce((acc, child) => `${acc} ${child.textContent}`, ''));
  }

  // parse node and all its children as text node
  if (parseText) {
    return deserialize('#text', {}, textContent);
  }

  // parse node normally and its children as text
  if (parseTextChildren) {
    return deserialize(nodeName, currentAttrs, textContent);
  }

  // deserialize children
  let children = Array.from(current.childNodes)
    .map(child => deserializeHtml(options, child))
    .flat()

  // skip current node and continue with children
  if (parseContinue) {
    return children;
  }

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
  const tagSettingsDict = tagSettingsToDict(options.tagSettings);

  return deserializeHtml({ ...options, tagSettingsDict }, parsed.body);
};
