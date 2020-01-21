import React from 'react';
import PropTypes from 'prop-types';

const ListBulleted = ({ children, ...rest }) => (
  <ul {...rest}>
    {children}
  </ul>
);

ListBulleted.propTypes = {
  children: PropTypes.any,
};

export default ListBulleted;
export const tag = 'UL';
export const type = 'bulleted-list';
export const get = () => ({ type });
