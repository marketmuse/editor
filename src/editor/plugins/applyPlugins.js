import * as defaultPlugins from '@plugins';
import mapReduceFlattenDict from '@utils/mapReduceFlattenDict';

export default (plugins = [], { useDefaultPlugins } = {}) => {

  // apply plugins
  const useDefaults = useDefaultPlugins ? Object.values(defaultPlugins) : [];
  const usePlugins = useDefaults.concat(plugins || []);

  const {
    toolbar,
    hotkeys,
    decorators,
    normalizerOptions: normalizerOptionsList,
    htmlDeserializerOptions: htmlDeserializerOptionsList,
    onValueChange,
    onInsertData,
    onKeyUp,
    onKeyDown,
    onCut,
    onCopy,
    onPaste,
    onBeforeInput,
    onBlur,
    onFocus,
    onClick,
    onMouseUp,
    onMouseDown,
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
    toolbar: toolbar.length > 0 ? toolbar[0] : null,
    hotkeys,
    decorators,
    extendCore,
    normalizerOptionsList,
    htmlDeserializerOptionsList,
    callbacks: {
      onValueChange,
      onInsertData,
    },
    events: {
      onKeyUp,
      onKeyDown,
      onCut,
      onCopy,
      onPaste,
      onBeforeInput,
      onBlur,
      onFocus,
      onClick,
      onMouseUp,
      onMouseDown,
      onCompositionStart,
      onCompositionEnd,
      onDragOver,
      onDragStart,
      onDrop,
    }
  }
}
