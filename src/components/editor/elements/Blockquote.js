import React from 'react';
import PropTypes from 'prop-types';

const Blockquote = ({ children, attributes = {} }) => (
  <blockquote {...attributes}>
    {children}
  </blockquote>
);

Blockquote.propTypes = {
  children: PropTypes.any,
  attributes: PropTypes.object,
};

export default Blockquote;
