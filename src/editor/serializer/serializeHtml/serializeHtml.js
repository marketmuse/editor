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
    return `<p>${serializeHtmlNodes(node.children, '')}</p>`;
  }

  // link
  if (node.type === types.a) {
    return `<a href="${node.href}">${serializeHtmlNodes(node.children, '')}</a>`;
  }

  // blockquote
  if (node.type === types.q) {
    return `<blockquote>${serializeHtmlNodes(node.children, '')}</blockquote>`
  }
};

const serializeHtmlNodes = (nodes, delim = '\n') => {
  const useNodes = Array.isArray(nodes) ? nodes : [nodes];
  return useNodes.map(serializeHtml).join(delim);
}

export default data => {
  return serializeHtmlNodes(data);
};
