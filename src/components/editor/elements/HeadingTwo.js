import React from 'react';
import PropTypes from 'prop-types';

const HeadingTwo = ({ children, attributes = {} }) => (
  <h2 {...attributes}>
    {children}
  </h2>
);

HeadingTwo.propTypes = {
  children: PropTypes.any,
  attributes: PropTypes.object,
};

export default HeadingTwo;
