import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createEditor } from 'slate';
import { Slate } from 'slate-react';

// bundler will pick up the style import below and
// turn it into an autoprefixed standalone css file
import '@config/defaultStyles';

import MMSEditorConsumer from '@/MMSEditorConsumer';
import initialState from '@config/initialState';
import withMarketmuse from '@editor/enhancer/withMarketmuse';
import getApplyPlugins from '@editor/plugins/getApplyPlugins';

import * as plugins from '@plugins';

const MMSEditor = props => {

  let usePlugins = [];

  // apply default plugins
  if (props.useDefaultPlugins) {
    usePlugins = usePlugins.concat(
      Object.values(plugins)
    );
  }

  // apply provided plugins
  usePlugins = usePlugins.concat(props.plugins || []);

  // plugin applier function
  const applyPlugins = useCallback(
    getApplyPlugins(usePlugins), [props.plugins])

  // merge all provided plugins into one
  const {
    hotkeys,
    decorators,
    extendCore,
    htmlDeserializerOptionsList,
  } = applyPlugins();

  const editor = useMemo(() => withMarketmuse(
    createEditor(), { htmlDeserializerOptionsList }), [])

  // Having the editor be uncontrolled seems to make more sense given that the
  // value will be slate-specific JSON syntax and won't mean much without further
  // processing / parsing. Editor component should take that responsibility, so
  // the data should be exposed through an api in a meaningful way, and it should
  // keep its own internal state.
  const [value, setValue] = useState(initialState);

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
        setValue={setValue}
        htmlDeserializerOptionsList={htmlDeserializerOptionsList}
      >
        {props.children}
      </MMSEditorConsumer>
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
