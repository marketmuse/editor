// takes decorators and return a dictionary with keys being
// decorator keys, and values being components to wrap the
// leafs around

// TODO: clean up this file

import React from 'react';
import getDecoratorKey from '@editor/decorators/utils/getDecoratorKey';

/* eslint-disable react/prop-types */

export default (decorators = []) => {
  return decorators.reduce((acc, decorator) => {

    let Component = null;

    // if a component is provided, use it
    if (decorator.component) {
      Component = decorator.component;
    }

    // component styles are provided
    if (decorator.style) {
      Component = props => (
        <span style={decorator.style}>
          {props.children}
        </span>
      );
    }

    // a render function is provided
    if (decorator.render) {
      Component = props => (
        <span>
          {decorator.render(props)}
        </span>
      )
    }

    return Object.assign({}, acc, {
      [getDecoratorKey(decorator.id)]: Component
    })
  }, {})
};
