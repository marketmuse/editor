export default props => {

  // strip props added by babel
  if (props && props.hasOwnProperty('__self')) delete props.__self;
  if (props && props.hasOwnProperty('__source')) delete props.__source;

  return props;
};
