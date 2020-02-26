import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import leafs from '@components/editor/core/leafs';

const Leaf = ({ decors, attributes, children, leaf } = {}) => {

  // apply built-ins leafs
  children = leafs.reduce((acc, l) => {

    // if this leafs key isn't on this node
    // do not wrap around its component
    if (!leaf[l.key]) return acc;

    // this leafs key is on this node
    // but the leaf is invalid
    if (!l || !l.component) return acc;

    // wrap the accumulator around this leafs component
    const Component = l.component;
    return <Component {...attributes}>{acc}</Component>;

  }, children);

  // apply custom decorator leafs
  Object.keys(decors).forEach(key => {
    if (!leaf[key]) return;
    // wrap children around component
    const Component = decors[key];
    children = <Component {...attributes}>{children}</Component>;
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
