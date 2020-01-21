import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ children, style, className, ...rest }) => (
  <li
    style={style}
    className={className}
    {...rest}
  >
    {children}
  </li>
);

ListItem.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ListItem;
export const tag = 'LI';
export const type = 'list-item';
export const get = () => ({ type });
