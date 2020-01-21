import React from 'react';
import PropTypes from 'prop-types';

const Blockquote = ({ children, ...rest } = {}) => (
  <blockquote {...rest}>
    {children}
  </blockquote>
);

Blockquote.propTypes = {
  children: PropTypes.any,
};

export default Blockquote;
export const tag = 'BLOCKQUOTE';
export const type = 'block-quote';
export const get = () => ({ type });
