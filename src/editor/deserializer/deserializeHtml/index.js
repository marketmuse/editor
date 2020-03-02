import cleanHtml from '@utils/cleanHtml';
import deserialize from '@editor/deserializer/deserialize';

// strategy constants
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
const strategiesToDict = (strategies = []) => {
  if (!Array.isArray(strategies)) return {};
  return strategies.reduce((acc, strategy) => {
    const t = (strategy.tag || '').toLowerCase();
    return { ...acc, [t]: strategy.strategy };
  }, {});
}

const deserializeHtml = (options = {}, el) => {

  const {

    // adjust render behaviour
    // key (string): tag names
    // value (string or function( el: HTMLElement, attrs: object ) -> string) - parse
    // configuration, or fn that receives el and attributes, and returns configuration
    // possible values: normal (default), text, textChildren, continue, continueText and skip
    strategiesDict = {}

  } = options;

  let current = el;
  let currentAttrs = extractAttributes(el);

  let { nodeType, nodeName, textContent } = current;

  // extract tag settings
  let strategy = strategiesDict[nodeName.toLowerCase()];

  // if strategy is a function
  // execute it to get the settings
  if (typeof strategy === 'function') {
    strategy = strategy(current, currentAttrs);
  }

  // get deserialize strategy for this tag
  let strategySkip = strategy === SKIP;
  let strategyContinue = strategy === CONTINUE;
  let strategyContinueText = strategy === CONTINUE_TEXT;
  let strategyText = strategy === TEXT;
  let strategyTextChildren = strategy === TEXT_CHILDREN;

  // get data on current node
  const isText = nodeType === window.Node.TEXT_NODE;
  const isElement = nodeType === window.Node.ELEMENT_NODE;
  const isLink = nodeName === 'A';
  const hasTextContent = !!textContent;

  // forced settings

  // only evaluate element nodes (ie. <p>, <div> etc.)
  if (!isElement && !isText) strategyContinue = true;
  // if an element has nothing in it to render, ignore
  if (!hasTextContent) strategySkip = true;
  // if text node, its content is its children
  if (isText) strategyText = true;
  // if a link has no href, treat it as a text node
  if (isLink && !currentAttrs.href) strategyText = true;

  // parse --

  // skip node and all its children
  if (strategySkip) {
    return [];
  }

  // skip current node and continue with children as text
  if (strategyContinueText) {
    return deserialize('#text', {}, Array.from(current.children)
      .reduce((acc, child) => `${acc} ${child.textContent}`, ''));
  }

  // parse node and all its children as text node
  if (strategyText) {
    return deserialize('#text', {}, textContent);
  }

  // parse node normally and its children as text
  if (strategyTextChildren) {
    return deserialize(nodeName, currentAttrs, textContent);
  }

  // deserialize children
  let children = Array.from(current.childNodes)
    .map(child => deserializeHtml(options, child))
    .flat()

  // skip current node and continue with children
  if (strategyContinue) {
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
  const strategiesDict = strategiesToDict(options.strategies);

  return deserializeHtml({ ...options, strategiesDict }, parsed.body);
};
