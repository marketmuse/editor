import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createEditor } from 'slate';
import { Slate } from 'slate-react';

// bundler will pick up the style import below and
// turn it into an autoprefixed standalone css file
import '@config/defaultStyles';

import initialValue from '@config/initialValue';
import withMarketmuse from '@editor/enhancer/withMarketmuse';
import applyPlugins from '@editor/plugins/applyPlugins';
import MMSEditorProvider from '@/MMSEditorProvider';

const MMSEditor = props => {

  const { children, plugins, useDefaultPlugins } = props;

  // merge plugins
  const mergePlugins = () => applyPlugins(plugins, { useDefaultPlugins });
  const pluginsDict = useMemo(mergePlugins, [plugins]);

  // create editor
  const editor = useMemo(() => withMarketmuse(createEditor(), pluginsDict), [])

  // Having the editor be uncontrolled seems to make more sense given that the
  // value will be slate-specific JSON syntax and won't mean much without further
  // processing / parsing. Editor component should take that responsibility, so
  // the data should be exposed through an api in a meaningful way, and it should
  // keep its own internal state.
  const [value, setValue] = useState(initialValue);
  const [state, setState] = useState({});

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <MMSEditorProvider
        value={value}
        state={state}
        setValue={setValue}
        setState={setState}
        pluginsDict={pluginsDict}
      >
        {children}
      </MMSEditorProvider>
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
