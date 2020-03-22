import { useRef, useCallback } from 'react';
import getDecorate from '@editor/decorators/getDecorate';
import getDecorComponents from '@editor/decorators/getDecorComponents';
import getDecorTriggers from '@editor/decorators/getDecorTriggers';

export default decorators => {
  const dMatches = useRef(null);
  const dAggregates = useRef(null);
  const decorComponents = getDecorComponents(decorators);
  const decorTriggers = getDecorTriggers(decorators);
  const decorate = useCallback(getDecorate(decorators, dMatches, dAggregates), [decorTriggers]);
  const decorStats = { matches: dMatches.current, aggregates: dAggregates.current }

  return {
    decorate,
    decorStats,
    decorTriggers,
    decorComponents,
  };
};
