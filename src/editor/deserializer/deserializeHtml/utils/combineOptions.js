import mapReduceFlatten from '@utils/mapReduceFlatten';

// combine a list of htmlDeserializerOption objects
export default (htmlDeserializerOptionsList = []) => {
  const transforms = mapReduceFlatten(htmlDeserializerOptionsList, 'transforms');
  const strategies = mapReduceFlatten(htmlDeserializerOptionsList, 'strategies');

  return {
    transforms,
    strategies,
  }
};
