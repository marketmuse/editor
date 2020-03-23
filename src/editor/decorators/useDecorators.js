import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import getDecorate from '@editor/decorators/getDecorate';
import getDecorComponents from '@editor/decorators/getDecorComponents';
import getDecorTriggers from '@editor/decorators/getDecorTriggers';

export default (decorators, value) => {

  const totalRef = useRef(0);
  const matchesRef = useRef({});
  const aggregatesRef = useRef({});
  const [updater, setUpdater] = useState(0);

  // force update this component on value change
  useEffect(() => { setUpdater(updater + 1); }, [value])

  const decorComponents = getDecorComponents(decorators);
  const decorTriggers = getDecorTriggers(decorators);
  const decorate = useMemo(() => getDecorate(decorators, {
    total: 0,
    matches: {},
    aggregates: {},
    setVals: ([ m, a, t ]) => {
      matchesRef.current = m;
      aggregatesRef.current = a;
      totalRef.current = t;
    }
  }), [decorTriggers]);

  const decorStats = {
    total: totalRef.current,
    matches: matchesRef.current,
    aggregates: aggregatesRef.current,
  }

  return {
    decorate,
    decorStats,
    decorTriggers,
    decorComponents,
  };
};
