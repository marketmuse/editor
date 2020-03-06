import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createEditor } from 'slate';
import { Slate } from 'slate-react';
import get from 'lodash/get';
import isNil from 'lodash/isNil';

// bundler will pick up the style import below and
// turn it into an autoprefixed standalone css file
import '@config/defaultStyles';

import MMSEditorConsumer from '@/MMSEditorConsumer';

import initialState from '@config/initialState';
import withMarketmuse from '@editor/enhancer/withMarketmuse';
import getApplyPlugins from '@editor/plugins/getApplyPlugins';

const MMSEditor = props => {

  // plugin applier function
  const applyPlugins = useCallback(
    getApplyPlugins(props.plugins || []), [props.plugins])

  const {
    hotkeys,
    decorators,
    htmlDeserializerOptionsArr: htmlDeserializerOptions,
    extendCore,
  } = applyPlugins();

  const editor = isNil(props.editor)
    ? useMemo(() => withMarketmuse(createEditor(), { htmlDeserializerOptions }), [])
    : props.editor;

  // Having the editor be uncontrolled seems to make more sense given that the
  // value will be slate-specific JSON syntax and won't mean much without further
  // processing / parsing. Editor component should take that responsibility, so
  // the data should be exposed through an api in a meaningful way, and it should
  // keep its own internal state.
  const [value, setValue] = useState(isNil(props.editor)
    ? initialState
    : (get(props, 'editor.children') || [])
  );

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={setValue}
    >
      <MMSEditorConsumer
        hotkeys={hotkeys}
        decorators={decorators}
        extendCore={extendCore}
      >
        {props.children}
      </MMSEditorConsumer>
    </Slate>
  );
};

MMSEditor.propTypes = {
  // to use editor instead of creating one
  editor: PropTypes.object,
  children: PropTypes.any,

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

export default MMSEditor;
