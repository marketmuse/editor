export default (list = [], key) => list
  .map(i => i[key])
  .reduce((acc, l) => acc.concat(l), []);
