import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = React.forwardRef(({ children, style, className, ...rest }, ref) => (
  <p
    style={style}
    className={className}
    {...rest}
  >
    {children}
  </p>
));

Paragraph.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Paragraph;
export const component = Paragraph;
export const tags = ['block', 'p'];
export const type = 'paragraph';
export const get = () => ({ type });