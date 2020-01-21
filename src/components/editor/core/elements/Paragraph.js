import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({ children, style, className, ...rest }) => (
  <p
    style={style}
    className={className}
    {...rest}
  >
    {children}
  </p>
);

Paragraph.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Paragraph;
export const tag = 'P';
export const type = 'paragraph';
export const get = () => ({ type });
