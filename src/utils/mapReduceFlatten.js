export default (list = [], key) => {
  return list
    .map(i => i[key])
    .filter(i => !!i)
    .reduce((acc, l) => acc.concat(l), [])
};
