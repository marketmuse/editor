import React from 'react';
import PropTypes from 'prop-types';
import combineComponents from '../../utils/combineComponents';

import Bold, * as b from './core/leafs/Bold';
import Italic, * as i from './core/leafs/Italic';
import Strikethrough, * as s from './core/leafs/Strikethrough';
import Underline, * as u from './core/leafs/Underline';

const Leaf = ({ attributes, children, leaf } = {}) => {
  if (leaf[b.key]) children = <Bold {...attributes}>{children}</Bold>;
  if (leaf[i.key]) children = <Italic {...attributes}>{children}</Italic>;
  if (leaf[s.key]) children = <Strikethrough {...attributes}>{children}</Strikethrough>;
  if (leaf[u.key]) children = <Underline {...attributes}>{children}</Underline>;
  return <span {...attributes}>{children}</span>;
};

Leaf.propTypes = {
  leaf: PropTypes.object,
  attributes: PropTypes.object,
  children: PropTypes.any,
};

export default Leaf;
export const leafs = combineComponents([
  b,
  i,
  s,
  u,
]);
