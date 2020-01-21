import React from 'react';
import PropTypes from 'prop-types';

const Italic = ({ children, style, className, ...rest }) => (
  <i
    style={style}
    className={className}
    // {...rest}
  >
    {children}
  </i>
);

Italic.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Italic;
export const tag = ['I', 'EM'];
export const key = 'italic';
export const get = () => ({ [key]: true });
