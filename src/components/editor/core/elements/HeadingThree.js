import React from 'react';
import PropTypes from 'prop-types';

const HeadingThree = React.forwardRef(({ children, style, className, ...rest } = {}, ref) => (
  <h3
    style={style}
    className={className}
    {...rest}
  >
    {children}
  </h3>
));

HeadingThree.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default HeadingThree;
export const component = HeadingThree;
export const tags = ['h3'];
export const type = 'heading-three';
export const get = () => ({ type });
