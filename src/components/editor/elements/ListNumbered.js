import React from 'react';
import PropTypes from 'prop-types';

const ListNumbered = ({ children, attributes = {} }) => (
  <ol {...attributes}>
    {children}
  </ol>
);

ListNumbered.propTypes = {
  children: PropTypes.any,
  attributes: PropTypes.object,
};

export default ListNumbered;
