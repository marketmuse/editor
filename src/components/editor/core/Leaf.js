import React from 'react';
import PropTypes from 'prop-types';
import combineComponents from '../../../utils/combineComponents';

import * as b from './leafs/Bold';
import * as i from './leafs/Italic';
import * as s from './leafs/Strikethrough';
import * as u from './leafs/Underline';

const Leaf = ({ attributes, children, leaf } = {}) => (
  <span />
);

Leaf.propTypes = {
  leaf: PropTypes.object,
  attributes: PropTypes.object,
  children: PropTypes.any,
};

export const leafs = combineComponents([
  b,
  i,
  s,
  u,
]);

export default Leaf;
