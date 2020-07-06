export default (callbacks = {}, args) => (callbackName, params = {}) => {
  const functions = callbacks[callbackName];
  if (!functions || !Array.isArray(functions)) return null;
  functions
    .filter(f => typeof f === 'function')
    .forEach(f => f(args ? { ...args, ...params } : params))
};
