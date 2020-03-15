import React from 'react';
import PropTypes from 'prop-types';

const ListBulleted = ({ children, attributes = {} }) => (
  <ul {...attributes}>
    {children}
  </ul>
);

ListBulleted.propTypes = {
  children: PropTypes.any,
  attributes: PropTypes.object,
};

export default ListBulleted;
