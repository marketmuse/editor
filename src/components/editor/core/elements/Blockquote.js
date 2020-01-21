import React from 'react';
import PropTypes from 'prop-types';

const Blockquote = ({ children, style, className, ...rest } = {}) => (
  <blockquote
    style={style}
    className={className}
    {...rest}
  >
    {children}
  </blockquote>
);

Blockquote.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Blockquote;
export const tag = 'BLOCKQUOTE';
export const type = 'block-quote';
export const get = () => ({ type });
