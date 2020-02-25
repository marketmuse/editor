// Will be invoked in `onKeyDown`
// e.preventDefault() to stop keystroke from registering
import isHotkey from 'is-hotkey';
import prepareHotkeys from '@editor/hotkeys/prepareHotkeys';

export default hotkeys => {
  const dict = prepareHotkeys(hotkeys);

  // curry hotkey validators
  const validators = Object.keys(dict).reduce((acc, key) => (
    { ...acc, [key]: isHotkey(key) }
  ), {});

  return ({ event, ...rest }) => {
    Object.keys(dict).forEach(key => {

      // grab curried validator functions
      const validate = validators[key];
      if (typeof validate !== 'function') return;

      // execute wrapped logic if hotkey detected
      if (validate(event)) {

        // execute the array of wrapped logic arr
        (dict[key] || [])
          .filter(f => typeof f === 'function')
          .forEach(f => f({ event, ...rest }))
      }
    })
  }
};
