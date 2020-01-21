import React from 'react';
import PropTypes from 'prop-types';

const Link = ({
  children,
  className,
  style,
  href,
  ...rest
}) => (
  <a
    href={href}
    target='_new'
    style={style}
    className={className}
    {...rest}
  >
    {children}
  </a>
);

Link.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  href: PropTypes.string,
};

export default Link;
export const tag = 'A';
export const type = 'link';
export const get = ({ href } = {}) => ({ type, href });
