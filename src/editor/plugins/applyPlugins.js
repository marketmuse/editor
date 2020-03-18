import mapReduceFlatten from '@utils/mapReduceFlatten';
import * as defaultPlugins from '@plugins';

export default (plugins = [], { useDefaultPlugins } = {}) => {

  // apply plugins
  const usePlugins = (useDefaultPlugins ? Object.values(defaultPlugins) : [])
    .concat(plugins || []);

  // flatten hotkeys from plugins
  const hotkeys = mapReduceFlatten(usePlugins, 'hotkeys');

  // flatten decorators from plugins
  const decorators = mapReduceFlatten(usePlugins, 'decorators');

  // combine all html deserializer options into one array
  const htmlDeserializerOptionsList = usePlugins.map(p => p.htmlDeserializerOptions);

  // generate function to extend core api's
  const extendCore = ({ functions, formats }) => {
    return usePlugins.reduce((acc, plugin = {}) => {
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
