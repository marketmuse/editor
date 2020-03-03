export default () => {
  return {
    name: 'sync-to-example',
    buildEnd () {
      // TODO: copy `dist` in example directory
      console.log('build had ended')
    }
  };
};
