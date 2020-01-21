import React from 'react';
import PropTypes from 'prop-types';

const Strikethrough = ({ children, style, className, ...rest }) => (
  <span
    style={Object.assign({ textDecoration: 'line-through' }, style)}
    className={className}
    // {...rest}
  >
    {children}
  </span>
);

Strikethrough.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Strikethrough;
export const tag = 'S';
export const key = 'strikethrough';
export const get = () => ({ [key]: true });
