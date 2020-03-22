import { useCallback } from 'react';
import getHandleHotkeys from '@editor/hotkeys/getHandleHotkeys';

export default hotkeys => {
  return useCallback(getHandleHotkeys(hotkeys), [hotkeys]);
};
