import React from 'react';
import PropTypes from 'prop-types';

const ListNumbered = ({ children, ...rest }) => (
  <ol {...rest}>
    {children}
  </ol>
);

ListNumbered.propTypes = {
  children: PropTypes.any,
};

export default ListNumbered;
export const tag = 'OL';
export const type = 'numbered-list';
export const get = () => ({ type });
