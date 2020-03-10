// a function to walk down the node tree and
// apply transformations on each node
const walk = (node, transform) => {

  // return null if invalid
  if (!node || typeof node !== 'object') return null;
  if (typeof transform !== 'function') return null;

  let newNode = { ...node };

  // transform node
  newNode = transform(newNode);

  // transform children if any
  if (newNode.children && Array.isArray(newNode.children)) {
    newNode.children = newNode.children.map(child => walk(child, transform))
  }

  return newNode;
}

export default (node, transform) => {
  if (Array.isArray(node)) return node.map(n => walk(n, transform));
  return walk(node, transform);
};
