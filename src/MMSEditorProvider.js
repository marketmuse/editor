import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createEditor } from 'slate';
import { Slate } from 'slate-react';
import get from 'lodash/get';
import isNil from 'lodash/isNil';

import initialState from '@config/initialState';
import withMarketmuse from '@editor/enhancer/withMarketmuse';

const MMSEditor = props => {

  const htmlParserOptions = props.htmlParserOptions || {};
  const editor = isNil(props.editor)
    ? useMemo(() => withMarketmuse(createEditor(), { htmlParserOptions }), [])
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
      {props.children}
    </Slate>
  );
};

MMSEditor.propTypes = {
  // use editor instead of creating one
  editor: PropTypes.object,
  children: PropTypes.any,
  htmlParserOptions: PropTypes.object,
};

export default MMSEditor;
