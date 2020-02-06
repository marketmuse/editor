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
export const component = ListBulleted;
export const tags = ['ul'];
export const type = 'bulleted-list';
export const listType = true;
export const get = () => ({ type });
