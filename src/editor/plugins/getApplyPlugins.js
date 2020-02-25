// TODO: test this

export default (plugins = []) => ({ functions, formats }) => {

  // first apply plugins to formats api because functions
  // api plugins will make use of the formats api
  return plugins.reduce((acc, plugin = {}) => {
    if (typeof plugin !== 'object') return acc;

    // extend formats
    const newFormats = typeof plugin.formats === 'function'
      ? plugin.formats(acc.formats, { functions: acc.functions })
      : acc.formats;

    // extend functions
    const newFunctions = typeof plugins.functions === 'function'
      ? plugin.functions(acc.functions, { formats: acc.formats })
      : acc.functions

    // return formats and functions
    return {
      formats: newFormats,
      functions: newFunctions
    }

  }, {
    formats,
    functions,
  });
};
