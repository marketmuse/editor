import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ children, ...rest }) => (
  <a {...rest}>
    {children}
  </a>
);

Link.propTypes = {
  children: PropTypes.any,
};

export default Link;
export const tag = 'A';
export const type = 'link';
export const get = ({ href } = {}) => ({ type, href });
