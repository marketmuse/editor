import React from 'react';
import PropTypes from 'prop-types';
import leafs from '@components/editor/leafs';

const Leaf = ({ decors = {}, attributes, children, leaf } = {}) => {

  const leafDecorations = leaf.decorations || {};

  // apply built-ins leafs
  children = Object.keys(leafs).reduce((acc, leafKey) => {

    // if this leafs key isn't on this node
    // do not wrap around its component
    if (!leaf[leafKey]) return acc;

    // wrap the accumulator around this leafs component
    const Component = leafs[leafKey];
    return <Component {...attributes}>{acc}</Component>;

  }, children);

  // apply custom decorator leafs
  Object.keys(decors).forEach(key => {

    // decorator doesn't exist
    if (!leafDecorations[key]) return;

    // wrap children around component
    const Component = decors[key];
    children = <Component dkey={key} {...attributes}>{children}</Component>;
  })

  return <span {...attributes}>{children}</span>;
};

Leaf.propTypes = {
  leaf: PropTypes.object,
  attributes: PropTypes.object,
  children: PropTypes.any,
  decors: PropTypes.object,
};

export default Leaf;
