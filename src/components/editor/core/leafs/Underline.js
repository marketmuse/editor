import React from 'react';
import PropTypes from 'prop-types';

const Underline = React.forwardRef(({ children, style, className, ...rest }, ref) => (
  <u style={style} className={className}>
    {children}
  </u>
));

Underline.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Underline;
export const component = Underline;
export const tags = ['u'];
export const key = 'underline';
export const get = () => ({ [key]: true });
