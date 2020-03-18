export default (events = {}) => (eventName, ...args) => {
  const functions = events[eventName];
  if (!functions || !Array.isArray(functions)) return null;
  functions
    .filter(f => typeof f === 'function')
    .forEach(f => f(...args))
};
