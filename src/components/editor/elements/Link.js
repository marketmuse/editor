import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ children, attributes = {}, element = {} }) => (
  <a href={element.href} target='_new' {...attributes}>
    {children}
  </a>
);

Link.propTypes = {
  children: PropTypes.any,
  attributes: PropTypes.object,
  element: PropTypes.object,
};

export default Link;
