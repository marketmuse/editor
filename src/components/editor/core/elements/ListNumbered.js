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
export const component = ListNumbered;
export const tags = ['ol'];
export const type = 'numbered-list';
export const listType = true;
export const get = () => ({ type });
