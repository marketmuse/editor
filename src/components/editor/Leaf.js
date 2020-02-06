import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import leafs from '@components/editor/core/leafs';

const Leaf = ({ attributes, children, leaf } = {}) => {

  children = leafs.reduce((acc, l) => {
    if (!leaf[l.key]) return acc;
    if (!l || !l.component) return acc;
    const Component = l.component;
    return <Component {...attributes}>{acc}</Component>;
  }, children);

  return <span {...attributes}>{children}</span>;
};

Leaf.propTypes = {
  leaf: PropTypes.object,
  attributes: PropTypes.object,
  children: PropTypes.any,
};

export default Leaf;
