// is string a valid value for being
// considered as a decorator
export default str => {
  if (!str) return false;
  if (str.length < 2) return false;
  return true;
};
