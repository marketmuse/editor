import React from 'react';
import PropTypes from 'prop-types';

const Link = React.forwardRef(({
  children,
  className,
  style,
  href,
  ...rest
}, ref) => (
  <a
    href={href}
    target='_new'
    style={style}
    className={className}
    {...rest}
  >
    {children}
  </a>
));

Link.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  href: PropTypes.string,
};

export default Link;
export const component = Link;
export const tags = ['a'];
export const type = 'link';
export const get = ({ href } = {}) => ({ type, href });
