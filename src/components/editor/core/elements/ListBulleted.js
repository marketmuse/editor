import React from 'react';
import PropTypes from 'prop-types';

const ListBulleted = React.forwardRef(({ children, style, className, ...rest }, ref) => (
  <ul
    style={style}
    className={className}
    {...rest}
  >
    {children}
  </ul>
));

ListBulleted.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ListBulleted;
export const tag = 'UL';
export const type = 'bulleted-list';
export const get = () => ({ type });
