import React from 'react';
import PropTypes from 'prop-types';

const HeadingOne = React.forwardRef(({ children, style, className, ...rest } = {}, ref) => (
  <h1
    style={style}
    className={className}
    {...rest}
  >
    {children}
  </h1>
));

HeadingOne.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default HeadingOne;
