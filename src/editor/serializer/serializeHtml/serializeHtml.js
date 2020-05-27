import { types } from '@config/common';

const serializeHtml = (node, html) => {

  // base case: leaf
  if (node.hasOwnProperty('text')) {
    let out = node.text;

    if (node[types.s]) out = `<s>${out}</s>`;
    if (node[types.u]) out = `<u>${out}</u>`;
    if (node[types.i]) out = `<i>${out}</i>`;
    if (node[types.b]) out = `<b>${out}</b>`;

    return out;
  }

  // this is not a text node, and has no children
  // silently handle the case by returning empty string
  if (!node.children) {
    return '';
  }

  // paragraph
  if (node.type === types.p) {
    return `<p>\n${serializeHtmlNodes(node.children)}\n</p>`;
  }
};

const serializeHtmlNodes = nodes => {
  const useNodes = Array.isArray(nodes) ? nodes : [nodes];
  return useNodes.map(serializeHtml).join('\n');
}

export default data => {
  return serializeHtmlNodes(data);
};
