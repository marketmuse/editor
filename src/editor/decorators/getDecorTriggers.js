export default (decorators = []) =>
  decorators.reduce((acc, d) => acc.concat(d.triggers), []);
