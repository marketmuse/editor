import React from 'react';
import PropTypes from 'prop-types';
import combineComponents from '@utils/combineComponents';
import _elements from '@components/editor/core/elements';

const Element = ({ attributes, children, element = {} }) => {
  const pass = Object.assign({}, attributes, element);  
  const el = _elements[element.type];
  const Component = !!el ? el.Component : _elements.default.Component;
  return <Component {...pass}>{children}</Component>;
};

Element.propTypes = {
  attributes: PropTypes.object,
  element: PropTypes.object,
  children: PropTypes.any,
};

export default Element;
export const elements = combineComponents(
  Object.values(_elements)
);
