import React from 'react';
import PropTypes from 'prop-types';
import { defaultElement, elementsByType } from '@components/editor/core/elements';

const Element = ({ attributes, children, element = {} }) => {
  const pass = Object.assign({}, attributes, element);
  const el = elementsByType[element.type];
  console.log('--->', elementsByType);
  const Component = !!el ? el.component : defaultElement.component;
  return <Component {...pass}>{children}</Component>;
};

Element.propTypes = {
  attributes: PropTypes.object,
  element: PropTypes.object,
  children: PropTypes.any,
};

export default Element;
