import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ children, attributes = {} }) => (
  <li {...attributes}>
    {children}
  </li>
);

ListItem.propTypes = {
  children: PropTypes.any,
  attributes: PropTypes.object,
};

export default ListItem;
