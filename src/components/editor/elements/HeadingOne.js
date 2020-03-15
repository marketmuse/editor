import React from 'react';
import PropTypes from 'prop-types';

const HeadingOne = ({ children, attributes = {} }) => (
  <h1 {...attributes}>
    {children}
  </h1>
);

HeadingOne.propTypes = {
  children: PropTypes.any,
  attributes: PropTypes.object,
};

export default HeadingOne;
