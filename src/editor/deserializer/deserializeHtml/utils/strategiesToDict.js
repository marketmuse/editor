// convert tag settings into dictionary grouped by tags
export default (strategies = []) => {
  if (!Array.isArray(strategies)) return {};
  return strategies.reduce((acc, strategy) => {
    const t = (strategy.tag || '').toLowerCase();
    return { ...acc, [t]: strategy.strategy };
  }, {});
};
