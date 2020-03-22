import React, { useCallback } from 'react';
import Leaf from '@components/editor/Leaf';
import Element from '@components/editor/Element';

export default ({
  decorComponents,
  decorTriggers
}) => {

  const renderElement = useCallback(props => {
    return <Element {...props} />
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf decors={decorComponents} {...props} />;
  }, [decorTriggers]);

  return {
    renderLeaf,
    renderElement,
  }
};
