import React from 'react';
import PropTypes from 'prop-types';

const ListItem = React.forwardRef(({ children, style, className, ...rest }, ref) => (
  <li
    style={style}
    className={className}
    {...rest}
  >
    {children}
  </li>
));

ListItem.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ListItem;
