import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({ children, attributes = {} }) => (
  <p {...attributes}>
    {children}
  </p>
);

Paragraph.propTypes = {
  children: PropTypes.any,
  attributes: PropTypes.object,
};

export default Paragraph;
