import React, { useCallback } from 'react';
import Leaf from '@components/editor/Leaf';
import Element from '@components/editor/Element';

export default ({
  leafUpdater,
  decorComponents,
  decorTriggers
}) => {

  const renderElement = useCallback(props => {
    return <Element {...props} />
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf decors={decorComponents} {...props} />;
  }, [decorTriggers, leafUpdater]);

  return {
    renderLeaf,
    renderElement,
  }
};
