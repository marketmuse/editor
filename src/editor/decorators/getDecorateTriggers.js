export default (decorators = []) => {
  return decorators.reduce((acc, d) => [
    ...acc,
    ...(d.triggers || [])
  ], []);
};
