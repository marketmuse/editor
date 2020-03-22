import * as defaultPlugins from '@plugins';
import mapReduceFlattenDict from '@utils/mapReduceFlattenDict';

export default (plugins = [], { useDefaultPlugins } = {}) => {

  // apply plugins
  const useDefaults = useDefaultPlugins ? Object.values(defaultPlugins) : [];
  const usePlugins = useDefaults.concat(plugins || []);

  const {
    hotkeys,
    decorators,
    htmlDeserializerOptions: htmlDeserializerOptionsList,
    onValueChange,
    onKeyDown,
    onCut,
    onCopy,
    onPaste,
    onBeforeInput,
    onBlur,
    onFocus,
    onClick,
    onCompositionStart,
    onCompositionEnd,
    onDragOver,
    onDragStart,
    onDrop,
  } = mapReduceFlattenDict(usePlugins);

  // generate function to extend core api's
  const extendCore = ({ functionsRaw, formatsRaw }) => (
    usePlugins.reduce((acc, plugin = {}) => {
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
      formats: formatsRaw,
      functions: functionsRaw,
    })
  )

  return {
    hotkeys,
    decorators,
    extendCore,
    htmlDeserializerOptionsList,
    callbacks: {
      onValueChange,
    },
    events: {
      onKeyDown,
      onCut,
      onCopy,
      onPaste,
      onBeforeInput,
      onBlur,
      onFocus,
      onClick,
      onCompositionStart,
      onCompositionEnd,
      onDragOver,
      onDragStart,
      onDrop,
    }
  }
}
