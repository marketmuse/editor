import mapReduceFlatten from '@utils/mapReduceFlatten';

// combine a list of htmlDeserializerOption objects
export default (options = []) => {
  const transforms = mapReduceFlatten(options, 'transforms');
  const strategies = mapReduceFlatten(options, 'strategies');

  return {
    transforms,
    strategies,
  }
};
