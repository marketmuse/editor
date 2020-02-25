// convert the keybinding array into a dictionary grouped by hotkey,
// with values being an array of logic for given binding
import isNil from 'lodash/isNil';

export default (hotkeys = []) => {
  return hotkeys.reduce((acc, k = {}) => {
    const key = (k.key || '').toLowerCase();
    if (!key) return acc;

    // combine `when` claus with `command` into one function
    const logic = ({ event, formats, functions } = {}) => {
      // ignore if command not a function
      if (typeof k.command !== 'function') return;
      // should run if when clause is truthy, or a function that returns truthy
      const when = isNil(k.when) ? true : k.when;
      const shouldRun = (typeof when === 'function') ? !!when({ event, formats }) : !!when;
      // execute command, pass functions api
      if (shouldRun) k.command({ event, functions });
    }

    return Object.assign({}, acc, {
      [key]: (acc[key] || []).concat(logic)
    })
  }, {})
};
