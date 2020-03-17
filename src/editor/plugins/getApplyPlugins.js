import mapReduceFlatten from '@utils/mapReduceFlatten';

export default (plugins = []) => () => {

  // flatten hotkeys from plugins
  const hotkeys = mapReduceFlatten(plugins, 'hotkeys');

  // flatten decorators from plugins
  const decorators = mapReduceFlatten(plugins, 'decorators');

  // combine all html deserializer options into one array
  const htmlDeserializerOptionsList = plugins.map(p => p.htmlDeserializerOptions);

  // generate function to extend core api's
  const extendCore = ({ functions, formats }) => {
    return plugins.reduce((acc, plugin = {}) => {
      if (typeof plugin !== 'object') return acc;

      // extend formats
      const newFormats = typeof plugin.formats === 'function'
        ? plugin.formats(acc.formats, { functions: acc.functions })
        : acc.formats;

      // extend functions
      const newFunctions = typeof plugin.functions === 'function'
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
  }

  return {
    hotkeys,
    decorators,
    extendCore,
    htmlDeserializerOptionsList,
  }
}
