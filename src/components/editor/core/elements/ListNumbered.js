import React from 'react';
import PropTypes from 'prop-types';

const ListNumbered = React.forwardRef(({ children, style, className, ...rest }, ref) => (
  <ol
    style={style}
    className={className}
    {...rest}
  >
    {children}
  </ol>
));

ListNumbered.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ListNumbered;
