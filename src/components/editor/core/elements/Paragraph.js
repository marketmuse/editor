import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({ children, ...rest }) => (
  <p {...rest}>
    {children}
  </p>
);

Paragraph.propTypes = {
  children: PropTypes.any,
};

export default Paragraph;
export const tag = 'P';
export const type = 'paragraph';
export const get = () => ({ type });
