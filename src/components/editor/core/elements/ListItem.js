import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ children, ...rest }) => (
  <li {...rest}>
    {children}
  </li>
);

ListItem.propTypes = {
  children: PropTypes.any,
};

export default ListItem;
export const tag = 'LI';
export const type = 'list-item';
export const get = () => ({ type });
