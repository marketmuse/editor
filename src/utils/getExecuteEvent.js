export default (events = {}, args) => (eventName, event, { noEvent } = {}) => {
  const functions = events[eventName];
  if (!functions || !Array.isArray(functions)) return null;
  functions
    .filter(f => typeof f === 'function')
    .forEach(f => {
      // some events does not have a synthetic event
      // object attached, call them with only args
      if (noEvent) f(args);
      else f(event, args);
    })
};
