import React from 'react';
import PropTypes from 'prop-types';
import { types } from '@config/common';
import elements from '@components/editor/elements';

const Element = ({ attributes, children, element = {} }) => {
  const Component = elements[element.type] || elements[types.p];
  return (
    <Component
      attributes={attributes}
      element={element}
    >
      {children}
    </Component>
  );
};

Element.propTypes = {
  attributes: PropTypes.object,
  element: PropTypes.object,
  children: PropTypes.any,
};

export default Element;
