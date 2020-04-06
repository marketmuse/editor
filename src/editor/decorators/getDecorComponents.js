// takes decorators and return a dictionary with keys being
// decorator keys, and values being components to wrap the
// leafs around

import React from 'react';
import getDecoratorKey from '@editor/decorators/utils/getDecoratorKey';

/* eslint-disable react/prop-types */

export default (decorators = []) => {
  return decorators.reduce((acc, decorator) => {

    let Component = null;

    // if a component is provided, use it
    if (decorator.component) {
      Component = () => (
        <span data-decorator={decorator.id}>
          {decorator.component}
        </span>
      );
    }

    // component styles are provided
    if (decorator.style) {
      Component = props => (
        <span data-decorator={decorator.id} style={decorator.style}>
          {props.children}
        </span>
      );
    }

    // a render function is provided
    if (decorator.render) {
      Component = props => (
        <span data-decorator={decorator.id}>
          {decorator.render(props)}
        </span>
      )
    }

    return Object.assign({}, acc, {
      [getDecoratorKey(decorator.id)]: Component
    })
  }, {})
};
