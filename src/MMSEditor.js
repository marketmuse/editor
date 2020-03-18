import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createEditor } from 'slate';
import { Slate } from 'slate-react';

// bundler will pick up the style import below and
// turn it into an autoprefixed standalone css file
import '@config/defaultStyles';

import { FormatsApiContext } from '@editor/hooks/useFormats';
import { FunctionsApiContext } from '@editor/hooks/useFunctions';
import MMSEditorConsumer from '@/MMSEditorConsumer';
import initialState from '@config/initialState';
import withMarketmuse from '@editor/enhancer/withMarketmuse';
import applyPlugins from '@editor/plugins/applyPlugins';
import getFormats from '@editor/formats';
import getFunctions from '@editor/functions';

const MMSEditor = props => {

  const { plugins, useDefaultPlugins } = props;

  // merge plugins
  const mergePlugins = () => applyPlugins(plugins, { useDefaultPlugins });
  const {
    hotkeys,
    decorators,
    htmlDeserializerOptionsList,
    extendCore,
  } = useMemo(mergePlugins, [plugins])

  const editor = useMemo(() => withMarketmuse(
    createEditor(), { htmlDeserializerOptionsList }), [])

  // Having the editor be uncontrolled seems to make more sense given that the
  // value will be slate-specific JSON syntax and won't mean much without further
  // processing / parsing. Editor component should take that responsibility, so
  // the data should be exposed through an api in a meaningful way, and it should
  // keep its own internal state.
  const [value, setValue] = useState(initialState);

  // extend functions and formats
  const { formats, functions } = extendCore({
    formats: getFormats(editor, {}),
    functions: getFunctions(editor, { setValue, htmlDeserializerOptionsList }),
  });

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <FormatsApiContext.Provider value={formats}>
        <FunctionsApiContext.Provider value={functions}>
          <MMSEditorConsumer
            hotkeys={hotkeys}
            decorators={decorators}
            extendCore={extendCore}
            formats={formats}
            functions={functions}
          >
            {props.children}
          </MMSEditorConsumer>
        </FunctionsApiContext.Provider>
      </FormatsApiContext.Provider>
    </Slate>
  );
};

MMSEditor.propTypes = {

  // to use editor instead of creating one
  children: PropTypes.any,

  // use default options
  useDefaultPlugins: PropTypes.bool,

  // an object containing extension functions
  plugins: PropTypes.arrayOf(
    PropTypes.shape({
      formats: PropTypes.function,
      functions: PropTypes.function,
      hotkeys: PropTypes.array,
      decorators: PropTypes.array,
      htmlDeserializerOptions: PropTypes.object,
    })
  )
};

MMSEditor.defaultProps = {
  useDefaultPlugins: true,
}

export default MMSEditor;
