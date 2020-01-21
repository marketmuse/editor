import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prop-types */
const H1 = ({ children, ...rest }) => <h1 {...rest}>{children}</h1>;
const H2 = ({ children, ...rest }) => <h2 {...rest}>{children}</h2>;
const H3 = ({ children, ...rest }) => <h3 {...rest}>{children}</h3>;
const H4 = ({ children, ...rest }) => <h4 {...rest}>{children}</h4>;
const H5 = ({ children, ...rest }) => <h5 {...rest}>{children}</h5>;
const H6 = ({ children, ...rest }) => <h6 {...rest}>{children}</h6>;
/* eslint-enable */

const Heading = ({ level, children, style, className, ...rest } = {}) => {
  const contents = children;
  let Tag = H1;

  switch (level) {
    case 1: Tag = H1; break;
    case 2: Tag = H2; break;
    case 3: Tag = H3; break;
    case 4: Tag = H4; break;
    case 5: Tag = H5; break;
    case 6: Tag = H6; break;
    default: Tag = H1; break;
  }

  return (
    <Tag
      style={style}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
};

Heading.propTypes = {
  level: PropTypes.number,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Heading;
export const tag = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
export const type = 'heading';
export const get = ({ level, tag = '' } = {}) => {
  let useLevel = level;
  if (!useLevel) {
    let useTag = tag.toUpperCase();
    if (useTag === 'H1') useLevel = 1;
    if (useTag === 'H2') useLevel = 2;
    if (useTag === 'H3') useLevel = 3;
    if (useTag === 'H4') useLevel = 4;
    if (useTag === 'H5') useLevel = 5;
    if (useTag === 'H6') useLevel = 6;
  }
  return {
    type,
    level: useLevel
  }
};
