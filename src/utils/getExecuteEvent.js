export default (events = {}, args) => (eventName, event) => {
  const functions = events[eventName];
  if (!functions || !Array.isArray(functions)) return null;
  functions
    .filter(f => typeof f === 'function')
    .forEach(f => f(event, args))
};
