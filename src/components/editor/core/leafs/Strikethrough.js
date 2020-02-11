import React from 'react';
import PropTypes from 'prop-types';

const Strikethrough = React.forwardRef(({ children, style, className, ...rest }, ref) => (
  <s style={style} className={className}>
    {children}
  </s>
));

Strikethrough.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Strikethrough;
export const component = Strikethrough;
export const tags = ['s', 'strike', 'del'];
export const key = 'strikethrough';
export const get = () => ({ [key]: true });
