import React from 'react';
import PropTypes from 'prop-types';

const Underline = ({ children, style, className, ...rest }) => (
  <u
    style={style}
    className={className}
    // {...rest}
  >
    {children}
  </u>
);

Underline.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Underline;
export const tag = 'U';
export const key = 'underline';
export const get = () => ({ [key]: true });
