// regular expressions needs to be executed globally
// make sure regular expressions has that flag
export default regex => {
  let flags = regex.flags;
  if (flags.indexOf('g') === -1) flags = `g${flags}`;
  return new RegExp(regex, flags);
}
