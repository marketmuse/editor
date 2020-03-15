import React from 'react';
import PropTypes from 'prop-types';

const HeadingThree = ({ children, attributes = {} }) => (
  <h3 {...attributes}>
    {children}
  </h3>
);

HeadingThree.propTypes = {
  children: PropTypes.any,
  attributes: PropTypes.object,
};

export default HeadingThree;
