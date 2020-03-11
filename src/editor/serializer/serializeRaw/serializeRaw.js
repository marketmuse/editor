import versions from '@config/versions';

export default (data, metadata = {}) => ({
  ...metadata,
  ...versions,
  data,
});
