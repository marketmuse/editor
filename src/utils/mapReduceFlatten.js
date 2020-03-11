export default (list = [], key) => {
  return list
    .filter(i => i && typeof i === 'object')
    .map(i => i[key])
    .filter(i => !!i)
    .reduce((acc, l) => acc.concat(l), [])
};
