import packageJson from '@/package.symlink.json';

export default {
  version: packageJson['version'],
  data_version: packageJson['data-version'],
  slate_version: packageJson['dependencies']['slate'],
  slate_history_version: packageJson['dependencies']['slate-history'],
  slate_react_version: packageJson['dependencies']['slate-react'],
};
