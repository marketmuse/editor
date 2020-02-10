import React from 'react';
import PropTypes from 'prop-types';

const Blockquote = React.forwardRef(({ children, style, className, ...rest } = {}, ref) => (
  <blockquote
    style={style}
    className={className}
    {...rest}
  >
    {children}
  </blockquote>
));

Blockquote.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Blockquote;
export const component = Blockquote;
export const tags = ['blockquote'];
export const type = 'blockquote';
export const get = () => ({ type });
