import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import combineComponents from '@utils/combineComponents';
import _leafs from '@components/editor/core/leafs';

const Leaf = ({ attributes, children, leaf } = {}) => {

  children = Object.keys(_leafs).reduce((acc, c) => {
    const useLeaf = get(_leafs, c);
    if (!useLeaf || !useLeaf.Component) return acc;
    const Component = useLeaf.Component;
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
export const leafs = combineComponents(
  Object.values(_leafs)
);
