import { useCallback } from 'react';
import getExecuteEvent from '@editor/events/getExecuteEvent';
import getExecuteCallback from '@editor/events/getExecuteCallback';

export default (events, callbacks, args) => {
  const execEvent = useCallback(getExecuteEvent(events, args), [events, args]);
  const execCallback = useCallback(getExecuteCallback(callbacks, args), [callbacks, args]);

  return {
    execEvent,
    execCallback,
  }
};
